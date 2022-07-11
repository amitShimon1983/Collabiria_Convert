param stage string
param app string
param location string
param logAnalyticsWorkspaceId string

module functionsAppServerFarmDeploy 'serverFarm.bicep' = {
  scope: resourceGroup()
  name: 'FunctionsAppPlanDeploy'
  params: {
    app: app
    location: location
    stage: stage
  }
}

module functionAppApplicationInsightsDeploy 'applicationInsights.bicep' = {
  scope: resourceGroup()
  name: 'FunctionAppApplicationInsightsDeploy'
  params: {
    app: app
    location: location
    stage: stage
    logAnalyticsWorkspaceId: logAnalyticsWorkspaceId
  }
}

module functionAppDeploy 'functionApp.bicep' = {
  scope: resourceGroup()
  name: 'FunctionAppDeploy'
  dependsOn: [
    functionsAppServerFarmDeploy
  ]
  params: {
    app: app
    location: location
    stage: stage
    serverFarmId: functionsAppServerFarmDeploy.outputs.serverFarmId
    subscriptionsInsightsConnectionString: functionAppApplicationInsightsDeploy.outputs.subscriptionsInsightsConnectionString
  }
}

output serverFarmId string = functionsAppServerFarmDeploy.outputs.serverFarmId
output serverFarmName string = functionsAppServerFarmDeploy.outputs.serverFarmName
output subscriptionsInsightsConnectionString string = functionAppApplicationInsightsDeploy.outputs.subscriptionsInsightsConnectionString
output functionAppId string = functionAppDeploy.outputs.functionAppId
output functionAppName string = functionAppDeploy.outputs.functionAppName
