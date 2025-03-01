import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const ProductFormSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500),
  price: z.number().min(0).max(1000000),
  quantity: z.number().optional().default(0),
  image: z.string().optional(),
});

export function ProductForm({ placeholder, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: placeholder,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          variant="outlined"
          {...form.register('name')}
          error={Boolean(form.formState.errors.name)}
        />
        {form.formState.errors?.name && (
          <Typography color="error">
            {form.formState.errors?.name.message}
          </Typography>
        )}

        <TextField
          label="Description"
          variant="outlined"
          multiline
          maxRows={5}
          {...form.register('description')}
          error={Boolean(form.formState.errors.description)}
        />
        {form.formState.errors?.description && (
          <Typography color="error">
            {form.formState.errors?.description.message}
          </Typography>
        )}

        <TextField
          label="Price"
          variant="outlined"
          type="number"
          required
          {...form.register('price', { valueAsNumber: true })}
          error={Boolean(form.formState.errors.price)}
        />
        {form.formState.errors?.price && (
          <Typography color="error">
            {form.formState.errors?.price.message}
          </Typography>
        )}

        <TextField
          label="Quantity"
          variant="outlined"
          type="number"
          {...form.register('quantity', { valueAsNumber: true })}
          error={Boolean(form.formState.errors.quantity)}
        />
        {form.formState.errors?.quantity && (
          <Typography color="error">
            {form.formState.errors?.quantity.message}
          </Typography>
        )}

        <TextField
          label="Image URL"
          variant="outlined"
          type="url"
          {...form.register('image')}
          error={Boolean(form.formState.errors.image)}
        />
        {form.formState.errors?.image && (
          <Typography color="error">
            {form.formState.errors?.image.message}
          </Typography>
        )}

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button variant="outlined" color="error" type="reset">
            Reset
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
