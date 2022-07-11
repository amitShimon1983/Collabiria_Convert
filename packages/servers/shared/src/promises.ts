export const promiseSerial = (functions: Promise<any>[]) =>
  functions.reduce(
    (promise, func: any) => promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );
export function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}
