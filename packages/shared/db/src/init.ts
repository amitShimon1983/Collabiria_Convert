import { Connection } from 'mongoose';
import { StatusModel, ColumnModel } from './models';

const initStatuses = async () => {
  const defaultStatuses = [
    { title: 'active', color: '#6264A7' },
    { title: 'owned', color: '#FFA00B' },
    { title: 'completed', color: '#11CD6F' },
  ];
  return await StatusModel.insertMany(defaultStatuses);
};

const initColumns = async (activeStatusId: string, ownedStatusId: string, doneStatusId: string) => {
  const defaultColumns = [
    {
      title: 'Shared',
      visibleStatuses: [activeStatusId],
      isDefault: true,
      Icon: 'https://static2.sharepointonline.com/files/fabric-cdn-prod_20200430.002/assets/brand-icons/product/svg/teams_48x1.svg',
      order: 1,
    },
    { title: 'Owned', visibleStatuses: [ownedStatusId], isDefault: true, order: 2 },
    { title: 'Completed', visibleStatuses: [doneStatusId], isDefault: true, order: 3 },
  ];
  return await ColumnModel.insertMany(defaultColumns);
};

export default async (dbClient: Connection | undefined) => {
  if (dbClient) {
    const [columnsCount, statusesCount] = await Promise.all([
      dbClient.collection('columns').count(),
      dbClient.collection('status').count(),
    ]);
    if (!columnsCount && !statusesCount) {
      const [activeStatus, ownedStatus, doneStatus] = await initStatuses();
      await initColumns(activeStatus._id, ownedStatus._id, doneStatus._id);
    }
  }
};
