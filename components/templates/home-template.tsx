'use client';

import * as React from 'react';
import CategoryFilter from '../category-filter';
import ProductListActions from '../product-list-actions';
import ProductList from '../product-list';
import useProductData from '@/lib/hooks/useProducts';
import { Product } from '@prisma/client';

export default function HomeTemplate(props: { initialData: Product[] }) {
  const { data } = useProductData(props.initialData);
  console.log('CLIENT DATA', data);
  return (
    <div className="w-full h-full lg:flex">
      <CategoryFilter />
      <div className="flex-1 lg:ml-4">
        <ProductListActions />
        <ProductList products={data} />
      </div>
    </div>
  );
}
