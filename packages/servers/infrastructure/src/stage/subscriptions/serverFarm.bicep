param location string
param stage string
param app string

resource serverFarm 'Microsoft.Web/serverfarms@2021-03-01' = {
  name: '${app}${stage}FunctionsAppServerFarm'
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
    size: 'Y1'
    family: 'Y'
    capacity: 0
  }
  kind: 'functionapp'
  properties: {
    reserved: false
  }
}

output serverFarmId string = serverFarm.id
output serverFarmName string = serverFarm.name
