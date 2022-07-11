param app string
param stage string
param location string
param serverFarmId string
param dockerRegistryHost string
param dockerRegistryPassword string
param dockerImageRepository string
param dockerRegistryUserName string
param serverInsightsConnectionString string
param serverInsightsInstrumentationKey string

var name = '${app}${stage}Server'

resource server 'Microsoft.Web/sites@2021-03-01' = {
  name: name
  location: location
  kind: 'app,linux,container'
  properties: {
    enabled: true
    hostNameSslStates: [
      {
        name: '${name}.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: '${name}.scm.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Repository'
      }
    ]
    serverFarmId: serverFarmId
    reserved: true
    isXenon: false
    hyperV: false
    siteConfig: {
      healthCheckPath: '/health-check'
      numberOfWorkers: 1
      linuxFxVersion: 'DOCKER|${dockerRegistryHost}/${dockerImageRepository}:latest'
      acrUseManagedIdentityCreds: false
      alwaysOn: false
      http20Enabled: true
      functionAppScaleLimit: 0
      minimumElasticInstanceCount: 0
    }
    scmSiteAlsoStopped: false
    clientAffinityEnabled: true
    clientCertEnabled: false
    clientCertMode: 'Required'
    hostNamesDisabled: false
    customDomainVerificationId: '27BFB01767C5B9B0F0B0B2F33DFDD76CD0F74752745F11A17F519E53306ABCFE'
    containerSize: 0
    dailyMemoryTimeQuota: 0
    httpsOnly: false
    redundancyMode: 'None'
    storageAccountRequired: false
    keyVaultReferenceIdentity: 'SystemAssigned'
  }
}

resource serverConfig 'Microsoft.Web/sites/config@2021-03-01' = {
  parent: server
  name: 'web'
  properties: {
    appSettings: [
      {
        name: 'WEBSITES_PORT'
        value: '3978'
      }
      {
        name: 'WEBSITES_CONTAINER_START_TIME_LIMIT'
        value: '320'
      }
      {
        name: 'APP_INSIGHTS_CONNECTION_STRING'
        value: serverInsightsConnectionString
      }
      {
        name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
        value: serverInsightsInstrumentationKey
      }
      {
        name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
        value: 'false'
      }
      {
        name: 'DOCKER_REGISTRY_SERVER_URL'
        value: 'https://${dockerRegistryHost}'
      }
      {
        name: 'DOCKER_REGISTRY_SERVER_USERNAME'
        value: dockerRegistryUserName
      }
      {
        name: 'DOCKER_REGISTRY_SERVER_PASSWORD'
        value: dockerRegistryPassword
      }
    ]
    numberOfWorkers: 1
    defaultDocuments: [
      'Default.htm'
      'Default.html'
      'Default.asp'
      'index.htm'
      'index.html'
      'iisstart.htm'
      'default.aspx'
      'index.php'
      'hostingstart.html'
    ]
    netFrameworkVersion: 'v4.0'
    linuxFxVersion: 'DOCKER|${dockerRegistryHost}/${dockerImageRepository}:latest'
    requestTracingEnabled: false
    remoteDebuggingEnabled: false
    remoteDebuggingVersion: 'VS2019'
    httpLoggingEnabled: true
    acrUseManagedIdentityCreds: false
    logsDirectorySizeLimit: 35
    detailedErrorLoggingEnabled: false
    publishingUsername: '$CollabriaDevServer'
    scmType: 'VSTSRM'
    use32BitWorkerProcess: true
    webSocketsEnabled: false
    alwaysOn: true
    managedPipelineMode: 'Integrated'
    virtualApplications: [
      {
        virtualPath: '/'
        physicalPath: 'site\\wwwroot'
        preloadEnabled: false
      }
    ]
    loadBalancing: 'LeastRequests'
    experiments: {
      rampUpRules: []
    }
    autoHealEnabled: false
    vnetRouteAllEnabled: false
    vnetPrivatePortsCount: 0
    localMySqlEnabled: false
    ipSecurityRestrictions: [
      {
        ipAddress: 'Any'
        action: 'Allow'
        priority: 1
        name: 'Allow all'
        description: 'Allow all access'
      }
    ]
    scmIpSecurityRestrictions: [
      {
        ipAddress: 'Any'
        action: 'Allow'
        priority: 1
        name: 'Allow all'
        description: 'Allow all access'
      }
    ]
    scmIpSecurityRestrictionsUseMain: false
    http20Enabled: true
    minTlsVersion: '1.2'
    scmMinTlsVersion: '1.2'
    ftpsState: 'AllAllowed'
    preWarmedInstanceCount: 0
    functionAppScaleLimit: 0
    functionsRuntimeScaleMonitoringEnabled: false
    minimumElasticInstanceCount: 0
    azureStorageAccounts: {
    }
  }
}

output serverId string = server.id
output serverName string = server.name
