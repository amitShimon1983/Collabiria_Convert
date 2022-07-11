import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema(
  {
    isDeleted: { type: Boolean, default: false },
    // ownerId is deprecated, will be removed
    ownerId: { type: String, required: true },
    ownerIds: [{ type: String, required: true, default: [] }],
    expirationDateTime: { type: Date, required: true },
    subscriptionId: { type: String, required: true },
    resource: { type: String, required: true },
    changeType: { type: String, required: true },
    notificationUrl: { type: String, required: true },
    mailboxId: { type: String, required: true },
  },
  { timestamps: true }
);

const SubscriptionModel = model('Subscription', subscriptionSchema);

export default SubscriptionModel;
