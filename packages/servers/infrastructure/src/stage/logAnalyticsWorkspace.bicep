param app string
param stage string
param location string

var name = '${app}${stage}LogAnalyticsWorkspace'

resource logAnalyticsWorkspace 'microsoft.operationalinsights/workspaces@2021-12-01-preview' = {
  name: name
  location: location
  properties: any({
    retentionInDays: 30
    features: {
      searchVersion: 1
    }
    sku: {
      name: 'PerGB2018'
    }
  })
}

output logAnalyticsWorkspaceId string = logAnalyticsWorkspace.id
