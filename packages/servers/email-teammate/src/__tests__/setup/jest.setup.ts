import { removeDatabase, createDatabase } from './utils';

beforeAll(async done => {
  await createDatabase();
  done();
});

afterAll(async done => {
  await removeDatabase();
  done();
});
