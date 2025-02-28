import { Box } from '@mui/material';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProductTable } from './components';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <ProductTable />
      </Box>
    </QueryClientProvider>
  );
}

export default App;
