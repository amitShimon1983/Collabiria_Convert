#generate the client bundle and the server
FROM node:14 as emailteammate


WORKDIR /app

COPY . /app

RUN cd /app && yarn
RUN cd /app && yarn build-all

#Move to a new image without the node-modules
FROM node:14

RUN mkdir -p /app/email-server
RUN mkdir -p /app/email-teammate
RUN mkdir -p /app/task-board

COPY --from=emailteammate /app/packages/clients/email-teammate/build /app/email-teammate
RUN true
COPY --from=emailteammate /app/packages/clients/task-board/build /app/task-board
RUN true
COPY --from=emailteammate /app/packages/servers/email-server/build /app/email-server

WORKDIR /app/email-server

EXPOSE 3978

ENV NODE_ENV=production

ENTRYPOINT ["node", "."]
