targetScope = 'subscription'

param app string = 'Collabria'
param location string = deployment().location

resource generalResourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  location: location
  name: '${app}GeneralResourceGroup'
}

module managedIdentityDeploy 'general/managedIdentity.bicep' = {
  scope: generalResourceGroup
  name: 'ManagedIdentityDeploy'
  params: {
    app: app
    location: generalResourceGroup.location
  }
}

module containerRegistryDeploy 'general/containerRegistry.bicep' = {
  scope: generalResourceGroup
  name: 'ContainerRegistryDeploy'
  params: {
    app: app
    location: generalResourceGroup.location
    managedIdentityPrincipalId: managedIdentityDeploy.outputs.managedIdentityPrincipalId
  }
}
