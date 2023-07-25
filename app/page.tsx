import { PrismaClient } from '@prisma/client';
import { PageProps } from '@/lib/interfaces';
import HomeTemplate from '@/components/templates/home-template';

const prisma = new PrismaClient();

export default async function Home({ params, searchParams }: PageProps) {
  console.log('HOME SERVER RENDER');
  // TODO: Add search params to query from request URL if possible
  await prisma.$connect();

  let products = await prisma.product.findMany({
    take: 10,
    // where: whereInput,
    // orderBy: orderByInputs,
  });

  await prisma.$disconnect();

  console.log('NETWORK BOUNDARY');

  return <HomeTemplate initialData={products} />;
}
