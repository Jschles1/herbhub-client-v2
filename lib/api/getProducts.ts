// export async function getProducts(searchParams?: Record<string, string>) {
//   let queryFilters = '?' + new URLSearchParams(searchParams).toString();
//   if (queryFilters === '?') queryFilters = '';
//   console.log('queryFilters', queryFilters);
//   const url = `${process.env.API_DOMAIN}/getProducts${queryFilters}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// }

import { QueryFunctionContext } from '@tanstack/react-query';
// import axios from 'axios';
// import { Product } from './interfaces';

export default async function getProducts({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<any> {
  try {
    const [_key, param] = queryKey;
    const queryParams = param.length ? `?${param}` : '';
    const response = await fetch(
      `${process.env.API_DOMAIN}/getProducts${queryParams}`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Error getting dispensary products: ', e);
    return Promise.reject(e);
  }
}
