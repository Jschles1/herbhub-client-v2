import CategoryFilter from '@/components/category-filter';
import ProductList from '@/components/product-list';
import ProductListActions from '@/components/product-list-actions';

export default function Home() {
  return (
    <div className="w-full h-full flex">
      <CategoryFilter />
      <div className="flex-1 ml-4">
        <ProductListActions />
        <ProductList />
      </div>
    </div>
  );
}
