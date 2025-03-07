const asyncHandler = require('express-async-handler');

const { productServices } = require('../service');

const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await productServices.createProduct(req.body);
  res.status(201).json(newProduct);
});

const getProducts = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const products = await productServices.getProducts({
    page: parseInt(page || '0'),
    limit: parseInt(limit || '10'),
  });
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productServices.getProductById(id);
  res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await productServices.updateProduct(id, req.body);
  res.status(201).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await productServices.deleteProduct(id);
  res.status(204).end();
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
