export const getUserGeography = async () => {
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};
