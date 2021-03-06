param location string
param app string
param currentTime string = utcNow()

var name = '${app}AppRegistration'

resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' existing = {
  name: '${app}ManagedIdentity'
  scope: resourceGroup()
}

resource script 'Microsoft.Resources/deploymentScripts@2019-10-01-preview' = {
  name: name
  location: location
  kind: 'AzurePowerShell'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
  properties: {
    azPowerShellVersion: '5.0'
    arguments: '-resourceName "${name}"'
    scriptContent: '''
    param([string] $resourceName)
    $token = (Get-AzAccessToken -ResourceUrl https://graph.microsoft.com).Token
    $headers = @{'Content-Type' = 'application/json'; 'Authorization' = 'Bearer ' + $token}

    $template = @{
      displayName = $resourceName
      requiredResourceAccess = @(
        @{
          resourceAppId = "00000003-0000-0000-c000-000000000000"
          resourceAccess = @(
            @{
              id = "e1fe6dd8-ba31-4d61-89e7-88639da4683d"
              type = "Scope"
            }
          )
        }
      )
      signInAudience = "AzureADMyOrg"
    }
   
    $app = (Invoke-RestMethod -Method Get -Headers $headers -Uri "https://graph.microsoft.com/beta/applications?filter=displayName eq '$($resourceName)'").value
    $principal = @{}
    if ($app) {
      $ignore = Invoke-RestMethod -Method Patch -Headers $headers -Uri "https://graph.microsoft.com/beta/applications/$($app.id)" -Body ($template | ConvertTo-Json -Depth 10)
      $principal = (Invoke-RestMethod -Method Get -Headers $headers -Uri "https://graph.microsoft.com/beta/servicePrincipals?filter=appId eq '$($app.appId)'").value
    } else {
      $app = (Invoke-RestMethod -Method Post -Headers $headers -Uri "https://graph.microsoft.com/beta/applications" -Body ($template | ConvertTo-Json -Depth 10))
      $principal = Invoke-RestMethod -Method POST -Headers $headers -Uri  "https://graph.microsoft.com/beta/servicePrincipals" -Body (@{ "appId" = $app.appId } | ConvertTo-Json)
    }
    
    $app = (Invoke-RestMethod -Method Get -Headers $headers -Uri "https://graph.microsoft.com/beta/applications/$($app.id)")
    
    foreach ($password in $app.passwordCredentials) {
      Write-Host "Deleting secret with id: $($password.keyId)"
      $body = @{
        "keyId" = $password.keyId
      }
      $ignore = Invoke-RestMethod -Method POST -Headers $headers -Uri "https://graph.microsoft.com/beta/applications/$($app.id)/removePassword" -Body ($body | ConvertTo-Json)
    }
    
    $body = @{
      "passwordCredential" = @{
        "displayName"= "Client Secret"
      }
    }
    $secret = (Invoke-RestMethod -Method POST -Headers $headers -Uri  "https://graph.microsoft.com/beta/applications/$($app.id)/addPassword" -Body ($body | ConvertTo-Json)).secretText

echo $secret
echo $app.appId
echo $app
    
    $DeploymentScriptOutputs = @{}
    $DeploymentScriptOutputs['objectId'] = $app.id
    $DeploymentScriptOutputs['clientId'] = $app.appId
    $DeploymentScriptOutputs['clientSecret'] = $secret
    $DeploymentScriptOutputs['principalId'] = $principal.id

    '''
    cleanupPreference: 'OnSuccess'
    retentionInterval: 'P1D'
    forceUpdateTag: currentTime 
  }
}

output objectId string = script.properties.outputs.objectId
output clientId string = script.properties.outputs.clientId
output clientSecret string = script.properties.outputs.clientSecret
output principalId string = script.properties.outputs.principalId

