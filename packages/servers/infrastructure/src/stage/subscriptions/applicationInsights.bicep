param app string
param stage string
param location string
param logAnalyticsWorkspaceId string

var name = '${app}${stage}SubscriptionsInsights'

resource subscriptionsInsights 'microsoft.insights/components@2020-02-02' = {
  name: name
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
    Request_Source: 'rest'
    RetentionInDays: 90
    WorkspaceResourceId: logAnalyticsWorkspaceId
    IngestionMode: 'LogAnalytics'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

output subscriptionsInsightsConnectionString string = subscriptionsInsights.properties.ConnectionString
