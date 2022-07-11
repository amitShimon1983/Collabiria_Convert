// import { Task } from '@harmonie/services';
// import { getIconUrl } from '@harmonie/ui';
export function humanFileSize(bytes: number, si = true, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return `${bytes.toFixed(dp)} ${units[u]}`;
}

export const isObjectId = (color: string) => !!color?.match(/^[0-9a-fA-F]{24}$/);

export const wait = (time: number) => new Promise(resolve => setTimeout(() => resolve(true), time));

export const encodeUrlIfExists = (url?: string) => (typeof url === 'string' ? encodeURI(url) : undefined);

function applyInlineStyles({ document, element, cssRules }: { element: any; document: any; cssRules: any[] }) {
  try {
    if (!element) {
      throw new Error('No element specified.');
    }

    const elementsQueue = [];
    let currentElement = element;

    while (currentElement) {
      if (currentElement.children?.length) {
        elementsQueue.push(...currentElement.children);
      }

      const matches = matchRules(currentElement, cssRules);

      // we need to preserve any pre-existing inline styles.
      const srcRules = document.createElement(currentElement.tagName).style;
      srcRules.cssText = currentElement?.style?.cssText;

      matches.forEach((style: any) => {
        for (let i = 0; i < style.length; i++) {
          const prop = style[i];
          const val = srcRules.getPropertyValue(prop) || style.getPropertyValue(prop);
          const priority = style.getPropertyPriority(prop);

          currentElement.style.setProperty(prop, val, priority);
        }
      });

      currentElement = elementsQueue.shift();
    }
  } catch (error) {
    console.log('error in applyInlineStyles ', error);
  }
}

const SPECIAL_CHARS_REGEX = /(<!--|-->|\n|\t|\b)/gim;

const getCssRules = (documentStyleSheets: any) => {
  const rules = [];
  for (const prop in documentStyleSheets) {
    if (documentStyleSheets.hasOwnProperty(prop)) {
      const currentCssRules = documentStyleSheets[prop].rules || documentStyleSheets[prop].cssRules;
      for (const rule in currentCssRules) {
        const preparedSelector = currentCssRules[rule].selectorText?.replace(SPECIAL_CHARS_REGEX, '');
        if (preparedSelector) {
          rules.push({
            selector: preparedSelector,
            rules: currentCssRules[rule].style,
          });
        }
      }
    }
  }
  return rules;
};

function matchRules(el: any, cssRules: Array<{ selector: string; rules: any }>) {
  if (typeof el?.matches !== 'function') {
    return [];
  }

  return cssRules
    .filter(rule => {
      try {
        return el?.matches(rule.selector);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`Invalid css selector${rule.selector}`);
        return false;
      }
    })
    .map(rule => rule.rules);
}

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

export const equalsIgnoreCase = (text1: string, text2: string) => {
  return text1?.trim()?.toLowerCase() === text2.trim().toLowerCase();
};
// export const addAttachmentIconUrl = (attachment: { [key: string]: any }) => ({
//   ...attachment,
//   iconUrl: getIconUrl(attachment.name, 32),
// });
export function getRandomNumberBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
export function generatePriority({ task, taskList, priority }: { task?: any; taskList: any[]; priority: number }) {
  if (task) {
    taskList.splice(priority, 0, task);
  }
  const beforeTask = taskList[priority - 1];
  const afterTask = taskList[priority + 1];
  const min = beforeTask?.priority || (afterTask?.priority || 0) - 1;
  const max = afterTask?.priority || min + 1;
  const range = getRandomNumberBetween(min, max);
  return +range.toFixed(20);
}
export const tasksFields = `
  _id
  title
  description
  created
  conversationRef {
    id
    activityId
  }
  emailInfo {
    emailId
    previewText    
    subject
    from {
      name
      address
    }
    to {
      name
      address
    }
    cc {
      name
      address
    }
    sentDateTime
    conversationId
    webUrl
    sharedFrom
    editedBody
  }
  owner {
    name
    upn
    userId
  }
  issuer {
    name
    upn
    userId
  }
  tags{
    _id
    name
  }
  status {
    _id
    color
  }
  priority
`;
