import { PageProps } from '@/lib/interfaces';
import HomeTemplate from '@/components/templates/home-template';
import getProducts from '@/lib/api/getProducts';

export default async function Home({ params, searchParams }: PageProps) {
  const data = await getProducts({
    queryKey: ['getDispensaryProducts', 'all'],
    meta: {},
  });
  return <HomeTemplate initialData={data} />;
}
