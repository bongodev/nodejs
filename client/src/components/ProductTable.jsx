import { useCallback, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import http from '../config/http';

const columns = [
  { field: 'sl', headerName: 'SL', width: 90 },
  {
    field: 'name',
    headerName: 'Product name',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    type: 'number',
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 110,
  },
  {
    field: 'image',
    headerName: 'Image',
    width: 160,
  },
];

export function ProductTable() {
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

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={formattedRows}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
