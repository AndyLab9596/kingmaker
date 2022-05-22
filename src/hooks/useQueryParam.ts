import querystring from 'query-string';

export function getParamsUrl<T>(): T {
  if (typeof window === 'undefined') return {} as T;
  return querystring.parse(window.location.search) as any;
}

export const setParams = (params, removeOldParams = false) => {
  let newParams = {};
  if (removeOldParams) {
    newParams = params;
  } else {
    const currentParams = getParamsUrl<any>() || {};
    newParams = Object.assign(currentParams, params);
  }
  const search = querystring.stringify(newParams);
  return search;
};

export const toParams = (params: any): string => {
  return querystring.stringify(params);
};
