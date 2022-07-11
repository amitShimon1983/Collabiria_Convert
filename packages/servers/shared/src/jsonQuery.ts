import jsonata, { Expression } from 'jsonata';

// base functions
const pathEquals = (path: string, address: string): string => `$lowercase("${address}") in $lowercase(${path})`;

const pathIn = (path: string, addresses: string): string => `
  $filter(${path}, function($value) {
    $filter(${addresses}, function($v) {
      $lowercase($value) = $lowercase($v)
    })
  })
`;

const addressDomainEquals = (path: string, domain: string): string => `
  $filter(${path}, function($value) {
    $lowercase($split($value, "@")[1]) = $lowercase("${domain}")
  })
`;

const stringValueContains = (path: string, text: string): string => `
  $filter(${path}, function($value) {
    $contains($lowercase($value), $lowercase("${text}"))
  })
`;

const stringValueEquals = (path: string, text: string): string => `
  $filter(${path}, function($value) {
    $lowercase($value) = $lowercase("${text}")
  })
`;

// predicates usage:
// import jsondata from 'jsondata';
// const expression = jsonata(fromAddressDomainEquals('microsoft.com'));
// const result = expression.evaluate(data);

// example: const expression = jsonata(fromAddressEquals('some@address.com'));
const fromAddressEquals = (address: string) => pathEquals('from.emailAddress.address', address);

// example: const expression = jsonata(fromAddressIn("['some@address1.com', 'some@address2.com']"));
const fromAddressIn = (addresses: string) => pathIn('from.emailAddress.address', addresses);

// example: const expression = jsonata(fromAddressDomainEquals('microsoft.com'));
const fromAddressDomainEquals = (domain: string) => addressDomainEquals('from.emailAddress.address', domain);

// example: const expression = jsonata(toAddressIn("['some@address1.com', 'some@address2.com']"));
const toAddressIn = (addresses: string) => pathIn('toRecipients.emailAddress.address', addresses);

// example: const expression = jsonata(toAddressDomainEquals('microsoft.com'));
const toAddressDomainEquals = (domain: string) => addressDomainEquals('toRecipients.emailAddress.address', domain);

// example: const expression = jsonata(subjectContains('monthly digest'));
const subjectContains = (text: string) => stringValueContains('subject', text);

// example: const expression = jsonata(subjectEquals('Your monthly digest'));
const subjectEquals = (text: string) => stringValueEquals('subject', text);

// example: const expression = jsonata(bodyContains('Hello world'));
const bodyContains = (text: string) => stringValueContains('body.content', text);

export interface JsonQueries {
  [Key: string]: (...params: any) => any;
}

const queries: JsonQueries = {
  fromAddressEquals,
  fromAddressIn,
  fromAddressDomainEquals,
  toAddressIn,
  toAddressDomainEquals,
  subjectContains,
  subjectEquals,
  bodyContains,
};

const create = (predicate: string, input: string): Expression => jsonata(queries[predicate](input));

const evaluate = (predicate: string, input: string, data: any[]): any => {
  const query = queries[predicate](input.toLowerCase());
  const expression = jsonata(query);
  const result = expression.evaluate(data);
  return result !== false && result !== undefined;
};

export { queries, create, evaluate };
