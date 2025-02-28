import { useQuery } from '@tanstack/react-query';

import http from '../config/http';

export default function useProducts() {
  const productQuery = useQuery({
    queryKey: 'products',
    queryFn: () => fetchProducts(),
  });

  return { productQuery };
}

const fetchProducts = async () => {
  const { data } = await http.get('/api/products');
  return data;
};
