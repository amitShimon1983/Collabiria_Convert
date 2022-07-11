// import config from './config';
export enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export const getLocalTimeByTimeZone = ({ timeZone }: { timeZone: string }) => {
  try {
    const options: any = {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat([], options);

    return formatter.format(new Date());
  } catch (error: any) {
    console.log({ message: error.message });
  }
  return null;
};

export const getDayAndHour = ({ dateAsString }: { dateAsString: string }) => {
  const date = new Date(dateAsString);
  return { day: date.getDay(), hour: date.getHours() };
};

export const isWorkingHours = ({ timeZone }: { timeZone: string }) => {
  const timeZoneTime = getLocalTimeByTimeZone({ timeZone });
  if (timeZoneTime) {
    const { day, hour } = getDayAndHour({ dateAsString: timeZoneTime });
    const { configValidDays, startHour, endHour } = getConfigurationValues();
    const isConfigAllowDay = configValidDays?.includes(day);
    const isNotWeekend = day !== WeekDay.Friday && day !== WeekDay.Saturday && day !== WeekDay.Sunday;
    const isDaylight = hour >= startHour && hour <= endHour;
    return { isNotWeekend: configValidDays?.length ? isConfigAllowDay : isNotWeekend, isDaylight };
  }
  return { isNotWeekend: false, isDaylight: false };
};

export const addDays = ({ date, daysToAdd }: { date: string; daysToAdd: number }) => {
  const result = new Date(date);
  result.setDate(result.getDate() + daysToAdd);
  return result;
};
export function getSendDateRange({ range }: { range: number }) {
  const today = new Date().toISOString();
  const startRange = addDays({ date: today, daysToAdd: -range });
  return { endRange: new Date(), startRange };
}
function getConfigurationValues() {
  const startHour = +(process?.env?.DIGEST_VALID_START_HOUR || 9);
  const endHour = +(process?.env?.DIGEST_VALID_END_HOUR || 16);
  //if we have value from config we will prioritize it over the code.
  const configValidDays = process?.env?.DIGEST_ALLOWED_SEND_DAYS
    ? JSON.parse(process?.env?.DIGEST_ALLOWED_SEND_DAYS)
    : [];
  return { configValidDays, startHour, endHour };
}
export function getTimeDifferenceInSec(issueAt: any) {
  const dif = new Date().getTime() - issueAt;
  return Math.floor(dif / 1000);
}
