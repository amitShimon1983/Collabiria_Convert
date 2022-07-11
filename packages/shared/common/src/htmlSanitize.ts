import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { putGlobalCssToInlineStyles } from '@harmonie/utils';

const window: any = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

DOMPurify.addHook('afterSanitizeAttributes', (node: any) => {
  // set all elements owning target to target=_blank
  if ('target' in node && node.getAttribute('target')?.includes('_blank')) {
    node.setAttribute('rel', 'noopener');
  }
  if (node.tagName === 'IMG' && !node.style.width && !node.width) {
    node.style.maxWidth = '100%';
    node.style.objectFit = 'contain';
  }
});

export const htmlSanitize = (html?: string) =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { svg: true, svgFilters: true, html: true },
    WHOLE_DOCUMENT: true,
    ADD_ATTR: ['target'],
  });

export const processEmailBody = (body: string, inlineAttachments: any[]) => {
  const domTree: any = new JSDOM(body);
  putGlobalCssToInlineStyles(domTree.window.document);
  const sanitizeBody = htmlSanitize(domTree.serialize());
  return replaceAttachmentsCId(sanitizeBody, inlineAttachments);
};
const replaceAttachmentsCId = (body: string, inlineAttachments: any[]): string => {
  if (!inlineAttachments || !inlineAttachments.length) {
    return body;
  }

  return inlineAttachments.reduce<string>((previousValue: string, currentValue: any) => {
    const { contentId, uri } = currentValue;
    const regex = new RegExp(`cid:${contentId}`, 'g');
    previousValue = previousValue.replace(regex, uri);
    return previousValue;
  }, body);
};
