targetScope = 'subscription'

param stage string
param location string = deployment().location
param app string = 'Collabria'
param dockerImageRepository string = 'collabria-server'

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2021-06-01-preview' existing = {
  name: '${app}ContainerRegistry'
  scope: resourceGroup(subscription().subscriptionId, '${app}GeneralResourceGroup' )
}

var dockerRegistryPassword = containerRegistry.listCredentials().passwords[0].value
var dockerRegistryUserName = containerRegistry.listCredentials().username
var dockerRegistryHost = containerRegistry.properties.loginServer

resource stageResourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  location: location
  name: '${app}${stage}ResourceGroup'
}

module keyVaultDeploy 'stage/keyVault.bicep' = {
  scope: stageResourceGroup
  name: 'KeyVaultDeploy'
  params: {
    app: app
    location: stageResourceGroup.location
    stage: stage
  }
}

module storageAccountDeploy 'stage/storageAccount.bicep' = {
  scope: stageResourceGroup
  name: 'StorageAccountDeploy'
  params: {
    app: app
    location: stageResourceGroup.location
    stage: stage
  }
}

module logAnalyticsWorkspaceDeploy 'stage/logAnalyticsWorkspace.bicep' = {
  scope:stageResourceGroup
  name: 'LogAnalyticsWorkspaceDeploy'
  params: {
    app: app
    location: stageResourceGroup.location
    stage: stage
  }
}

module serverDeploy 'stage/server/deployment.bicep' = {
  scope: stageResourceGroup
  name: 'ServerModuleDeploy'
  dependsOn: [
    logAnalyticsWorkspaceDeploy
  ]
  params: {
    app: app
    location: stageResourceGroup.location
    stage: stage
    dockerRegistryHost: dockerRegistryHost
    dockerRegistryPassword: dockerRegistryPassword
    dockerImageRepository: dockerImageRepository
    dockerRegistryUserName: dockerRegistryUserName
    logAnalyticsWorkspaceId: logAnalyticsWorkspaceDeploy.outputs.logAnalyticsWorkspaceId
  }
}

module functionAppDeploy 'stage/subscriptions/deployment.bicep' = {
  scope: stageResourceGroup
  name: 'FunctionAppModuleDeploy'
  dependsOn: [
    logAnalyticsWorkspaceDeploy
  ]
  params: {
    app: app
    location: stageResourceGroup.location
    stage: stage
    logAnalyticsWorkspaceId: logAnalyticsWorkspaceDeploy.outputs.logAnalyticsWorkspaceId
  }
}
