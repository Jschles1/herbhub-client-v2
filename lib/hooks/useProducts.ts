import { useQuery } from '@tanstack/react-query';
import { useQueryParams } from '../store';
import getProducts from '../api/getProducts';

export default function useProductData(initialData: any) {
  const [params] = useQueryParams();
  return useQuery({
    queryKey: ['getDispensaryProducts', params],
    queryFn: () => getProducts(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    initialData,
  });
}
