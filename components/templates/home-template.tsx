'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryFilter from '../category-filter';
import ProductListActions from '../product-list-actions';
import ProductList from '../product-list';
import useProductData from '@/lib/hooks/useProducts';

export default function HomeTemplate(props: { initialData: any }) {
  const { data } = useProductData(props.initialData);
  return (
    <div className="w-full h-full flex">
      <CategoryFilter />
      <div className="flex-1 ml-4">
        <ProductListActions />
        <ProductList />
      </div>
      {JSON.stringify(data)}
    </div>
  );
}
