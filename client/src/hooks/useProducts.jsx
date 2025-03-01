import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import http from '../config/http';

const PRODUCT_QUERY_KEY = 'products';

export default function useProducts() {
  const productQuery = useQuery({
    queryKey: [PRODUCT_QUERY_KEY],
    queryFn: () => fetchProducts(),
  });

  const queryClient = useQueryClient();

  const productCreateMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      alert('Product created successfully');
      queryClient.invalidateQueries(PRODUCT_QUERY_KEY);
    },
    onError: (error) => {
      alert('Failed to create product');
      console.error(error);
    },
  });

  return { productQuery, productCreateMutation };
}

const fetchProducts = async () => {
  const { data } = await http.get('/api/products');
  return data;
};

const createProduct = async (newProduct) => {
  const { data } = await http.post('/api/products', newProduct);
  return data;
};
