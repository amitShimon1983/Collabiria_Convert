import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window: any = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
export const htmlSanitize = (html: string) =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { svg: true, svgFilters: true, html: true },
    WHOLE_DOCUMENT: true,
    ADD_ATTR: ['target'],
  });
export const putGlobalCssToInlineStyles = (treeRoot: HTMLElement) => {
  try {
    const stylesBlocks = (treeRoot as any).querySelectorAll('style');
    stylesBlocks.forEach((node: any) => node.remove());
    const links = (treeRoot as any).querySelectorAll('a');
    links.forEach((link: any) => {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  } catch (error: any) {
    console.log({ message: 'putGlobalCssToInlineStyles', errorMessage: error.message });
  }
};
