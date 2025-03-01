import { useState } from 'react';

import { Box, Button, Drawer } from '@mui/material';

import { ProductForm, ProductTable } from './components';

import './App.css';
import useProducts from './hooks/useProducts';

const productPlaceholder = {
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  image: '',
};

function App() {
  const [open, setOpen] = useState(false);
  const { productCreateMutation } = useProducts();

  return (
    <Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-end"
        p={2}
        onClick={() => setOpen(true)}
      >
        <Button variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
      <ProductTable />
      <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
        <Box width={600} p={2}>
          <ProductForm
            placeholder={productPlaceholder}
            onSubmit={(payload) =>
              productCreateMutation
                .mutateAsync(payload)
                .finally(() => setOpen(false))
            }
          />
        </Box>
      </Drawer>
    </Box>
  );
}

export default App;
