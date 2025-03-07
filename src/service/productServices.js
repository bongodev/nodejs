const { Product } = require('../model');

const createProduct = async (productPayload) => {
  const newProduct = new Product(productPayload);
  await newProduct.save();
  return newProduct;
};

const getAllProducts = async () => {
  const products = await Product.find({ deleted: false }).select(
    '_id name price image categories'
  );
  return products;
};

const getProductById = async (id) => {
  return await Product.findOne({ _id: id, deleted: false });
};

const updateProduct = async (id, payload) => {
  return await Product.findByIdAndUpdate({ _id: id }, payload);
};

const deleteProduct = async (id) => {
  await Product.findOneAndUpdate(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );
  return true;
};

module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
