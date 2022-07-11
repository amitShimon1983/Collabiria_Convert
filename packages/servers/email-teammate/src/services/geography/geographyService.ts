import { GeographyModel } from '@harmonie/server-db';
import { isWorkingHours } from '@harmonie/server-shared';

export async function getGeography(geography: { timezone: string } | undefined) {
  let geographyRes: any;
  if (geography) {
    let dbGeography = await GeographyModel.findOne({ timezone: geography?.timezone });
    if (!dbGeography) {
      dbGeography = await GeographyModel.create({ ...geography });
    }
    geographyRes = dbGeography._id;
  }
  return geographyRes;
}

export const getAllActiveTimezones = async () => {
  const dbsGeography = await GeographyModel.find({});
  const activeTimezone = [];
  if (dbsGeography?.length) {
    for (let index = 0; index < dbsGeography.length; index++) {
      const { timezone, _id } = dbsGeography[index];
      const { isNotWeekend, isDaylight } = isWorkingHours({ timeZone: timezone });
      if (isNotWeekend && isDaylight) {
        activeTimezone.push(_id);
      }
    }
  }
  return activeTimezone;
};
