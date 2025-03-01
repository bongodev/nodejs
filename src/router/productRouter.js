const express = require('express');

const { ProductSchema } = require('../schema');
const { validatePayload } = require('../middleware');

const { productController } = require('../controller');

const productRouter = express.Router();

productRouter.post(
  '/',
  validatePayload(ProductSchema.omit({ _id: true })),
  productController.createProduct
);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.put(
  '/:id',
  validatePayload(ProductSchema.partial()),
  productController.updateProduct
);
productRouter.delete('/:id', productController.deleteProduct);
productRouter.get('/search', productController.searchProductByName);

module.exports = productRouter;
