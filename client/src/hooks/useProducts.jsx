import { useCallback, useEffect, useMemo, useState } from 'react';

import http from '../config/http';

export default function useProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await http.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const formattedRows = useMemo(
    () =>
      products.map((product, index) => ({
        id: product._id,
        sl: index + 1,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
      })),
    [products]
  );

  return { formattedRows };
}
