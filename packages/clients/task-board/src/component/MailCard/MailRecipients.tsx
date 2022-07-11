import React, { useMemo } from 'react';
import { TooltipHost, DirectionalHint } from '@fluentui/react';

const limit = 2;
interface MailRecipientsProps {
  toRecipients: any;
}
const MailRecipients = ({ toRecipients }: MailRecipientsProps) => {
  const recipients = useMemo(() => {
    return toRecipients.length > limit ? toRecipients?.slice(0, limit) : toRecipients;
  }, [toRecipients]);

  return (
    <>
      <label>To:</label>
      {recipients?.map(({ emailAddress: { name } }: { emailAddress: { name: string } }) => name).join(', ')}
      <TooltipHost
        directionalHint={DirectionalHint.bottomCenter}
        content={toRecipients
          ?.slice(limit)
          .map(({ emailAddress: { name } }: { emailAddress: { name: string } }) => name)
          .join(', ')}
      >
        {toRecipients.length - recipients.length > 0 && (
          <span style={{ color: '#6264A7', fontWeight: 600 }}>{` +${toRecipients.length - recipients.length}`}</span>
        )}
      </TooltipHost>
    </>
  );
};

export default MailRecipients;
