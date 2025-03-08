import { z } from 'zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '../ui';

import { CloudUploadIcon, DeleteIcon } from '../ui/Icons';

const ProductFormSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500),
  price: z.number().min(0).max(1000000),
  quantity: z.number().optional().default(0),
  image: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
});

export function ProductForm({ placeholder, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: placeholder,
  });

  const imageInputRef = useRef(null);

  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(placeholder?.image || '');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);
  };

  const handleRemoveImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    setPreviewImage('');
  };

  const handleFormSubmit = async (data) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'imageFile') {
          return;
        }
        formData.append(key, data[key]);
      });

      if (imageInputRef.current?.files?.[0]) {
        formData.append('imageFile', imageInputRef.current.files[0]);
      }

      await onSubmit(formData);
    } catch (err) {
      console.error('Error in form submitting', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={form.handleSubmit(handleFormSubmit)}
    >
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

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={2}
      >
        <Box>
          <input
            accept="image/*"
            type="file"
            id="image-upload"
            hidden
            onChange={handleImageUpload}
            disabled={isUploading}
            ref={imageInputRef}
          />
          <label htmlFor="image-upload">
            <Button
              component="span"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              disabled={isUploading}
            >
              Choose Image
            </Button>
          </label>
        </Box>

        {previewImage && (
          <Box display="flex" alignItems="center">
            <img
              src={previewImage}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                border: '1px solid #ddd',
              }}
            />
            <IconButton color="error" onClick={handleRemoveImage}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>

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
  );
}
