import React, { useState, useEffect, useMemo } from 'react';

const replaceInlineAttachmentsToBase64 = (body: string, attachments: Array<any>) => {
  let tempBody = body;
  attachments.forEach((attachment: any) => {
    const { contentId, contentType, contentBytes } = attachment;
    while (tempBody.includes(`cid:${contentId}`)) {
      tempBody = tempBody.replace(`cid:${contentId}`, `data:${contentType};base64,${contentBytes}`);
    }
  });
  return tempBody;
};

export const useSanitizeEmailBody = ({
  emailAttachments,
  body,
  replaceInlineAttachments = replaceInlineAttachmentsToBase64,
}: {
  emailAttachments: any[];
  body: string;
  replaceInlineAttachments?: (body: string, attachments: Array<any>) => string;
}) => {
  const [sanitizeBody, setBody] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (emailAttachments && emailAttachments.length && body) {
      setLoading(true);
      setBody(replaceInlineAttachments(body, emailAttachments));
      setLoading(false);
    } else {
      setBody(body);
    }
  }, [emailAttachments, body, replaceInlineAttachments]);

  const res = useMemo(() => ({ sanitizeBody, loading }), [sanitizeBody]);

  return res;
};
