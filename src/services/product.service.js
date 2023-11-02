const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**

    * Create a product
    
    * @param {Object} productBody
    
    * @returns {Promise<Product>}
    
    */

const createProduct = async (productBody) => {
  if (await Product.isSkuTaken(productBody.productSku)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sku already taken');
  }
  return Product.create(productBody);
};

/**

    * Query for products
    
    * @param {Object} filter - Mongo filter
    
    * @param {Object} options - Query options
    
    * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
    
    * @param {number} [options.limit] - Maximum number of results per page (default = 10)
    
    * @param {number} [options.page] - Current page (default = 1)
    
    * @returns {Promise<QueryResult>}
    
    */

const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

/**

    * Get product by id
    
    * @param {ObjectId} id
    
    * @returns {Promise<Product>}
    
    */

const getProductById = async (id) => {
  return Product.findById(id);
};

/**
 *
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */

const updateProductById = async (id, updateBody) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (updateBody.productSku && (await Product.isSkuTaken(updateBody.productSku, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sku already taken');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 *
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */

const deleteProductById = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
