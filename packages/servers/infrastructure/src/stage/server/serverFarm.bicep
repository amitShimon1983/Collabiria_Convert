param location string
param stage string
param app string

resource serverFarm 'Microsoft.Web/serverfarms@2021-03-01' = {
  name: '${app}${stage}WebSiteServerFarm'
  location: location
  sku: {
    name: 'B2'
    tier: 'Basic'
    size: 'B2'
    family: 'B'
    capacity: 1
  }
  kind: 'linux'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 3
    isSpot: false
    reserved: true
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}

output serverFarmId string = serverFarm.id
output serverFarmName string = serverFarm.name
