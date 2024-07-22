import { Dict } from './type';

export function parseQueryString(query: string): Dict<string> {
  if (query.startsWith('?')) {
    query = query.slice(1);
  }
  const records: Dict<string> = {};
  for (const kvString of query.split('&')) {
    const idx = kvString.indexOf('=');
    if (idx === -1) {
      continue;
    }
    const key = kvString.slice(0, idx);
    const value = kvString.slice(idx + 1, kvString.length);
    records[key] = decodeURI(value);
  }
  return records;
}

export function generateQueryString(records: Dict<string>): string {
  let query = '?';
  for (let i = 0; i < Object.keys(records).length; i++) {
    const key = Object.keys(records)[i];
    const value = Object.values(records)[i];
    if (i) {
      query += '&';
    }
    query += `${key}=${encodeURI(value)}`;
  }
  return query;
}

export function parseCPAData(query: string): any {
  const records = parseQueryString(query);
  if (!records.cpa) {
    return null;
  }
  const json = decodeURI(atob(records.cpa));
  let data: any = null;
  try {
    data = JSON.parse(json);
  } catch (err) {
    console.error('JSON parse error!');
    return null;
  }
  return data;
}

export function generateCPAData(data: any): string {
  const json = JSON.stringify(data);
  return generateQueryString({ cpa: btoa(encodeURI(json)) });
}
