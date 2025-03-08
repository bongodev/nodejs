const path = require('path');
const express = require('express');

const { ProductSchema, CreateProductPayload } = require('../schema');
const { validatePayload, upload } = require('../middleware');

const config = require('../config');
const { productController } = require('../controller');
const logger = require('../config/logger');

const productRouter = express.Router();

productRouter.use(
  '/images',
  express.static(
    path.join(__dirname, `../../${config.FILE_SERVER.UPLOAD_DIR}`),
  ),
);

productRouter.post(
  '/',
  upload.single('imageFile'),
  (req, res, next) => {
    if (req.file) {
      logger.info(`Request has file ${req.file.filename}`);
      req.body.image = `/api/products/images/${req.file.filename}`;
    }
    next();
  },
  validatePayload(CreateProductPayload),
  productController.createProduct,
);
productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.put(
  '/:id',
  validatePayload(ProductSchema.partial()),
  productController.updateProduct,
);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
