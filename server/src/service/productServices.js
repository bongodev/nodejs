const { Product } = require('../model');

const createProduct = async (productPayload) => {
  const newProduct = new Product(productPayload);
  await newProduct.save();
  return newProduct;
};

const getProducts = async ({ page = 0, limit = 10 }) => {
  const products = await Product.find({ deleted: false })
    .select('_id name price image categories')
    .skip(page * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

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
    { deleted: true, deletedAt: new Date() },
  );
  return true;
};

module.exports = {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
};
