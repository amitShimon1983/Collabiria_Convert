param app string
param location string
param managedIdentityPrincipalId string

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2021-06-01-preview' = {
  name: '${app}ContainerRegistry'
  location: location
  sku: {
    name: 'Standard'
  }
  properties: {
    adminUserEnabled: false
    policies: {
      quarantinePolicy: {
        status: 'disabled'
      }
      trustPolicy: {
        type: 'Notary'
        status: 'disabled'
      }
      retentionPolicy: {
        days: 7
        status: 'disabled'
      }
      exportPolicy: {
        status: 'enabled'
      }
    }
    encryption: {
      status: 'disabled'
    }
    dataEndpointEnabled: false
    publicNetworkAccess: 'Enabled'
    networkRuleBypassOptions: 'AzureServices'
    zoneRedundancy: 'Disabled'
  }
}

resource ownerRoleAssignment 'Microsoft.Authorization/roleAssignments@2018-01-01-preview' = {
  name: guid('${containerRegistry.id}/${managedIdentityPrincipalId}/owner')
  scope: containerRegistry
  properties: {
    roleDefinitionId: '/subscriptions/${subscription().subscriptionId}/providers/Microsoft.Authorization/roleDefinitions/8e3af657-a8ff-443c-a75c-2fe8c4bcb635'
    principalId: managedIdentityPrincipalId
  }
}

resource appServiceContainerScopeMap 'Microsoft.ContainerRegistry/registries/scopeMaps@2020-11-01-preview' = {
  parent: containerRegistry
  name: 'AppServiceContainerScopeMap'
  properties: {
    actions: [
      'repositories/collabria-server/content/read'
      'repositories/collabria-server/metadata/read'
    ]
  }
}

resource appServiceContainerToken 'Microsoft.ContainerRegistry/registries/tokens@2020-11-01-preview' = {
  parent: containerRegistry
  name: 'AppServiceContainerToken'
  properties: {
    scopeMapId: appServiceContainerScopeMap.id
    status: 'enabled'
  }
}

output containerRegistryId string = containerRegistry.id
output containerRegistryName string = containerRegistry.name
