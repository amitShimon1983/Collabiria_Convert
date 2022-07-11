const argsSerializer = (args: any) => {
  const { message, ...rest } = args;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body, ...messageRest } = message || {};
  return {
    ...rest,
    ...messageRest,
  };
};

export default argsSerializer;
