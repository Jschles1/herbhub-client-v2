import * as React from 'react';
import ProductListItem from './product-list-item';
import { Product } from '@prisma/client';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="border border-blue-500 p-4 flex items-center flex-wrap">
      {products.map((p) => (
        <ProductListItem key={p.id} />
      ))}
    </div>
  );
}
