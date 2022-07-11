import React, { useRef } from 'react';
import HtmlMailBody from '../HtmlBody/HtmlMailBody';

const MailBodyPreview = ({ body }: { body: any }) => {
  const htmlBodyRef = useRef(null);

  return <HtmlMailBody ref={htmlBodyRef} rootRef={htmlBodyRef.current} isMobile={false} html={body} />;
};

export default MailBodyPreview;
