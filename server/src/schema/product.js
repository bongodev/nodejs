const { z } = require('zod');

const { IDSchema, DateMixin } = require('./mixin');

const ReviewSchema = z.object({
  ...IDSchema.shape,
  ...DateMixin.shape,
  name: z.string(),
  rating: z.number(),
  comment: z.string(),
});

const ProductSchema = z.object({
  ...IDSchema.shape,
  ...DateMixin.shape,
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.number(),
  quantity: z.number().optional().default(0),
  categories: z.array(z.string()).optional().default([]),
  metadata: z.object({
    isFeatured: z.boolean().optional().default(false),
  }).optional(),
  reviews: z.array(ReviewSchema).optional(),
});

module.exports = {
  ProductSchema,
  ReviewSchema,
};
