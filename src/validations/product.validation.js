const Joi = require('joi');
const { objectId } = require('./custom.validation');

const productCategories = [
  'clothes',
  'bags',
  'jeans',
  'jewelry',
  'watches',
  'sunglasses',
  'pants',
  'shorts',
  'skirts',
  'dresses',
  'shirts',
  't-shirts',
  'sweaters',
  'hoodies',
  'jackets',
  'coats',
  'underwear',
  'socks',
  'baggy pants',
  'suits',
  'swimwear',
  'sleepwear',
  'activewear',
  'shoes',
  'accessories',
  'toys',
  'sports',
  'other',
];

const createProduct = {
  body: Joi.object().keys({
    productSku: Joi.string().required(),
    productName: Joi.string().required(),
    productDescription: Joi.string().required(),
    productPrice: Joi.number(),
    productCategory: Joi.string()
      .required()
      .valid(...productCategories),
    productImage: Joi.string().required(),
    productQuantity: Joi.number().required(),
    productSeller: Joi.string().required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    productSku: Joi.string(),
    productName: Joi.string(),
    productDescription: Joi.string(),
    productPrice: Joi.number(),
    productCategory: Joi.string(),
    productImage: Joi.string(),
    productQuantity: Joi.number(),
    productRating: Joi.number(),
    productReviews: Joi.string(),
    productSeller: Joi.string(),
    productSellerId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      productSku: Joi.string(),
      productName: Joi.string(),
      productDescription: Joi.string(),
      productPrice: Joi.number(),
      productCategory: Joi.string(),
      productImage: Joi.string(),
      productQuantity: Joi.number(),
      productRating: Joi.number(),
      productReviews: Joi.string(),
      productSeller: Joi.string(),
      productSellerId: Joi.string(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  productCategories,
};
