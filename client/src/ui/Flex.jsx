import { Box } from '@mui/material';

export const Flex = ({ children, ...props }) => {
  <Box display="flex" {...props}>
    {children}
  </Box>;
};
