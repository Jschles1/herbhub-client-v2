import { PageProps } from '@/lib/interfaces';
import { NotFoundError } from '@/lib/exceptions';

// export async function generateStaticParams() {}

export default async function PDP({ params }: PageProps) {
  const productId = params!.productId;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${productId}`
  );

  if (!response.ok) {
    throw new NotFoundError();
  }

  const data = await response.json();

  console.log(data);
  // console.log(params, searchParams);
  return <div className="w-full h-full flex">{JSON.stringify(data)}</div>;
}
