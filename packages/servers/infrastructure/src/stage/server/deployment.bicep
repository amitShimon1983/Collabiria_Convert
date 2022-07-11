param location string
param stage string
param app string
param logAnalyticsWorkspaceId string
param dockerRegistryHost string
param dockerRegistryPassword string
param dockerImageRepository string
param dockerRegistryUserName string

module webSiteServerFarmDeploy 'serverFarm.bicep' = {
  scope: resourceGroup()
  name: 'ServerFarmDeploy'
  params: {
    app: app
    location: location
    stage: stage
  }
}

module webSiteApplicationInsightsDeploy 'applicationInsights.bicep' = {
  scope: resourceGroup()
  name: 'WebSiteApplicationInsightsDeploy'
  params: {
    app: app
    location: location
    stage: stage
    logAnalyticsWorkspaceId: logAnalyticsWorkspaceId
  }
}

module webSiteServerDeploy 'webSite.bicep' = {
  scope: resourceGroup()
  name: 'WebSiteServerDeploy'
  dependsOn: [
    webSiteServerFarmDeploy
  ]
  params: {
    app: app
    location: location
    stage: stage    
    serverFarmId: webSiteServerFarmDeploy.outputs.serverFarmId    
    dockerRegistryHost: dockerRegistryHost
    dockerRegistryPassword: dockerRegistryPassword
    dockerImageRepository: dockerImageRepository
    dockerRegistryUserName: dockerRegistryUserName
    serverInsightsConnectionString: webSiteApplicationInsightsDeploy.outputs.serverInsightsConnectionString
    serverInsightsInstrumentationKey: webSiteApplicationInsightsDeploy.outputs.serverInsightsInstrumentationKey
  }
}

output serverFarmId string = webSiteServerFarmDeploy.outputs.serverFarmId
output serverFarmName string = webSiteServerFarmDeploy.outputs.serverFarmName
output serverInsightsConnectionString string = webSiteApplicationInsightsDeploy.outputs.serverInsightsConnectionString
output serverId string = webSiteServerDeploy.outputs.serverId
output serverName string = webSiteServerDeploy.outputs.serverName
