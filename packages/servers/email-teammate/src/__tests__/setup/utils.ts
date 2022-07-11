// @ts-nocheck
import { exec } from 'child_process';
// eslint-disable-next-line import/order
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { MongoStorage } from '@harmonie/server-db';
import { promises } from '@harmonie/server-shared';

export const runCommand = async (command: string) =>
  new Promise(resolve => {
    const ls = exec(command, { env: process.env });
    ls.on('close', resolve);
  });

let db: MongoStorage;

export const createDatabase = async () => {
  await runCommand(
    'docker run -d -p 27001:27001 -p 27002:27002 -p 27003:27003 --name mongo-unit-tests -e "REPLICA_SET_NAME=mongo-rs" --restart=always flqw/docker-mongo-local-replicaset'
  );
  const dbUrl = 'mongodb://localhost:27001/teamMateUnitTests?replicaSet=mongo-rs';
  db = new MongoStorage(dbUrl);
  await db.connect();
  await promises.sleep(5000);
  return db;
};

export const removeDatabase = async () => {
  await db._client.close();
  await runCommand('docker stop mongo-unit-tests');
  await runCommand('docker rm mongo-unit-tests');
};
