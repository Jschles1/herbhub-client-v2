import { PageProps } from '@/lib/interfaces';
import HomeTemplate from '@/components/templates/home-template';

export default async function Home({ params, searchParams }: PageProps) {
  console.log('HOME SERVER RENDER');
  const data = { message: 'Hello from the server render', params: '' };
  console.log('DATA', data);
  return <HomeTemplate initialData={data} />;
}
