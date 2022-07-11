# harmon.ie Emails Teammate

## Running in Dev Mode

###Env

1. For developing locally in the teams environment, you need your OWN personal
   bot registration. The tunnel process will update the messaging endpoint
   to point to the ngrok tunnel which forwards to the local machine.

1. install Azure CLI, run 'az login'

1. Fill in an .env file in the project root directory with the necessary values from
   the bot creation process

```
BotRegistrationName=
BotRegistrationResourceGroup=
BotRegistrationAppId=
BotRegistrationAppPassword=
BotRegistrationConnectionName=
AppClientId=
AppDirectoryId=
AppClientSecret=
HOST=
CLIENT_HOST=
```

1. From `/server` directory:
   1. `npm run start-dev-tunnel` Starts 2 tunnels, for client and server
      1. First time only -- once the tunnel process has started, take the manifest.zip file which is generated in /tmp/manifest.zip, and upload it to Teams.
   1. `npm run start-dev` Starts the server / bot process
1. From `/client` directory:
   1. `npm start` Starts react app

## Build / Deploy

The build is fully dockerized and automated. See `Dockerfile` and `azure-pipelines.yml`
Currently, deploy to staging/prod is done by manually changing docker build number in the Azure web app hosting the docker container.
