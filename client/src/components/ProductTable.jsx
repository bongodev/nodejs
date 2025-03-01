import { useMemo } from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import useProducts from '../hooks/useProducts';
import { Button } from '@mui/material';

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
  {
    field: 'action',
    headerName: 'Action',
    headerAlign: 'center',
    flex: 1,
    sortable: false,
    renderCell: () => {
      return (
        <Box display="flex" justifyContent="center" gap={1}>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </Box>
      );
    },
  }
];

export function ProductTable() {
  const { productQuery } = useProducts();

  const formattedRows = useMemo(
    () =>
      productQuery.data?.map((product, index) => ({
        id: product._id,
        sl: index + 1,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
      })),
    [productQuery.data]
  );

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        loading={productQuery.isLoading}
        rows={formattedRows}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
