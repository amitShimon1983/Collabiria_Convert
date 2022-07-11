import { parse } from './lang/poolQueryLangParser';

export const stringToTerms = searchTerm => {
  const {
    poolQueryContext: { start, children },
  } = parse(searchTerm);

  const result = [];
  const terms = {};
  if (children) {
    const [freeText] = children;
    if (freeText.parser.ruleNames[freeText.ruleIndex] === 'freeText') {
      terms.freeText = searchTerm;
    } else {
      for (let x = 0; x < children.length; x += 1) {
        for (let y = 0; y < children[x].children.length; y += 1) {
          const token = children[x].children[y];
          if (token.symbol) {
            const key = token.symbol.text.replace(':', '');
            result.push(key.toLowerCase());
          }
          if (token.children) {
            terms[result[x]] = token.children.map(child => child.symbol.text).join(' ');
          }
        }
      }
    }
  } else {
    terms.freeText = searchTerm;
  }

  return terms;
};

export const termsToString = terms => {
  if (Object.prototype.hasOwnProperty.call(terms, 'freeText')) {
    return terms.freeText;
  }

  let str = '';
  for (let p in terms) {
    if (Object.prototype.hasOwnProperty.call(terms, p)) {
      str += `${p}:${terms[p]} `;
    }
  }
  return str;
};

export const encodeString = item => {
  try {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(item);
    return encoded.join(',');
  } catch (e) {
    return item;
  }
};

export const decodeString = item => {
  try {
    const decoder = new TextDecoder();
    const decoded = item.split(',').map(i => parseInt(i));
    return decoder.decode(new Uint8Array(decoded));
  } catch (e) {
    return item;
  }
};
