import mongoose, { ClientSession } from 'mongoose';
export const runWithTransaction = async <T>(fn: (session: ClientSession) => Promise<T>, executeTimes = 0) => {
  const session = await mongoose.startSession();
  let sessionRes;
  session.startTransaction();
  try {
    sessionRes = await fn(session);
    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    console.error(`[runWithTransaction]. Caught exception during transaction. ${error.message}`);
    // If transient error, retry the whole transaction
    if (error.errorLabels && error.errorLabels.indexOf('TransientTransactionError') >= 0 && executeTimes < 10) {
      console.error('[runWithTransaction] TransientTransactionError, retrying transaction ...');
      executeTimes++;
      await runWithTransaction(fn, executeTimes);
    } else {
      session.abortTransaction();
      console.error(`[runWithTransaction] runTransactionWithRetry error: ${error.message}`);
      throw error;
    }
  }
  return sessionRes;
};
