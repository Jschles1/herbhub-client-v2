import { PageProps } from '@/lib/interfaces';
import HomeTemplate from '@/components/templates/home-template';
import getProducts from '@/lib/api/getProducts';

export default async function Home({ params, searchParams }: PageProps) {
  console.log('HOME SERVER RENDER');
  const data = await getProducts();
  return <HomeTemplate initialData={data} />;
}
