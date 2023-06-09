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
import axios from 'axios';
// import axios from 'axios';
// import { Product } from './interfaces';

export default async function getProducts(param?: string): Promise<any> {
  try {
    console.log('1. GET PRODUCTS FETCHER', param);
    const queryParams = param && param.length ? `?${param}` : '';
    let domain = process.env.API_DOMAIN + '/';
    if (domain === 'undefined/') {
      domain = '';
    }
    const url = `${domain}getProducts${queryParams}`;
    console.log('2. REQUEST URL', url);
    const response = await axios.get(url);
    const data = response.data;
    console.log('5. RESPONSE', data);
    return data;
  } catch (e) {
    console.error('Error getting dispensary products: ', e);
    return Promise.reject(e);
  }
}
