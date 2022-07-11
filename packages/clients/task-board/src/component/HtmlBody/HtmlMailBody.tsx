import React, { useEffect, forwardRef, useRef, useState, useMemo } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { get, kebabCase } from 'lodash';
import { theme } from '@harmonie/services';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'harmonie-html-shadow-body': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Using web components API to encapsulate mail css in shadow DOM
class HtmlShadowBody extends HTMLElement {
  private html: string;
  private rootStyles: CSSProperties;
  private root: HTMLDivElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.rootStyles = { overflowWrap: 'break-word', paddingBottom: '.5vh' };
    this.root = document.createElement('div');
    for (const ruleName of Object.keys(this.rootStyles)) {
      this.root.style.setProperty(kebabCase(ruleName), get(this.rootStyles, ruleName));
    }
    this.shadowRoot?.appendChild(this.root);
  }

  render(html: string) {
    this.root!.innerHTML = html;
  }

  updateHtml(html: string, onRenderCallback?: () => void) {
    this.render(html);
    onRenderCallback?.();
  }
}

if (!window.customElements.get('harmonie-html-shadow-body')) {
  window.customElements.define('harmonie-html-shadow-body', HtmlShadowBody);
}

const emptyInlineAttachments = (bodyRoot?: HTMLElement, replacementHtml = '') => {
  const images = bodyRoot?.shadowRoot?.querySelectorAll('img');
  images?.forEach((img: HTMLImageElement) => {
    if (img.src.toLowerCase().startsWith('cid:')) {
      img.outerHTML = replacementHtml;
    }
  });
};

const updateElementsAccordingToTheme = (root: HTMLElement, baseWhiteColor: string) => {
  if (!root) {
    return;
  }
  const elems = root.querySelectorAll('*') as NodeListOf<HTMLElement>;
  elems?.forEach(elem => transformElementForDarkMode(elem, baseWhiteColor));
};

const HtmlMailBody = (
  {
    html,
    className,
    rootRef,
    onHtmlSet,
    isMobile,
    isInlineAttachmentsLoaded,
  }: {
    html?: string;
    isMobile: boolean;
    className?: string;
    rootRef?: HTMLElement | null;
    onHtmlSet?: (rootHeight: number) => void;
    isInlineAttachmentsLoaded?: boolean;
  },
  ref: any
) => {
  const { palette } = theme.getSemanticTheme();
  const { settings } = theme.getCustomizations();
  const [isColorsUpdateNeeded, setColorsUpdateNeeded] = useState(false);
  const themeName = settings?.theme?.name;
  const defaultRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ref: any = rootRef || defaultRef.current;
    if (html && ref) {
      const htmlBodyElement = ref.querySelector('harmonie-html-shadow-body');
      htmlBodyElement?.updateHtml(html);
      if (!isInlineAttachmentsLoaded) {
        emptyInlineAttachments(htmlBodyElement);
      }
      onHtmlSet?.(ref.clientHeight);

      if (themeName && themeName !== 'default' && html && !isColorsUpdateNeeded) {
        setColorsUpdateNeeded(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, rootRef, isInlineAttachmentsLoaded, isMobile]);

  useEffect(() => {
    const ref: any = rootRef || defaultRef.current;
    if (ref) {
      const htmlBodyElement = ref.querySelector('harmonie-html-shadow-body');
      if (themeName && themeName !== 'default' && html && !isColorsUpdateNeeded) {
        setColorsUpdateNeeded(true);
      }
      if (htmlBodyElement && themeName === 'default') {
        htmlBodyElement?.updateHtml(html);
        if (!isInlineAttachmentsLoaded) {
          emptyInlineAttachments(htmlBodyElement);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeName, rootRef]);

  useEffect(() => {
    if (isColorsUpdateNeeded) {
      const ref: any = rootRef || defaultRef.current;
      const htmlBodyElement = ref?.querySelector('harmonie-html-shadow-body');
      updateElementsAccordingToTheme(htmlBodyElement?.shadowRoot, palette.white);
      setColorsUpdateNeeded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isColorsUpdateNeeded]);

  return (
    <div ref={ref || defaultRef} className={className}>
      <harmonie-html-shadow-body></harmonie-html-shadow-body>
    </div>
  );
};

export default forwardRef(HtmlMailBody);
function transformElementForDarkMode(elem: HTMLElement, baseWhiteColor: string): void {
  throw new Error('Function not implemented.');
}
