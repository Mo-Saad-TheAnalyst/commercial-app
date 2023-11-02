const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    productSku: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    productPrice: {
      type: Number,
      required: false,
      trim: true,
    },
    productCategory: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    productImage: {
      type: String,
      required: true,
      trim: true,
    },
    productQuantity: {
      type: Number,
      required: true,
      trim: true,
    },
    productRating: {
      type: Number,
      required: false,
      trim: true,
    },
    productReviews: {
      type: String,
      required: false,
      trim: true,
    },
    productSeller: {
      type: String,
      required: true,
      trim: true,
    },
    productSellerId: {
      type: String,
      required: false,
      trim: true,
    },
    productSellerRating: {
      type: Number,
      required: false,
      trim: true,
    },
    productSellerReviews: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} productSku - product sku
 * @param {ObjectId} [excludeProductId] - The id of product to be excluded
 * @returns {Promise<boolean>}
 */
productSchema.statics.isSkuTaken = async function (productSku, excludeProductId) {
  const productItem = await this.findOne({ productSku, _id: { $ne: excludeProductId } });
  return !!productItem;
};

/**
 * @typedef product
 */
const product = mongoose.model('Product', productSchema);

module.exports = product;
