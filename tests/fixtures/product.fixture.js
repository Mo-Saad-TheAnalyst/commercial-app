const mongoose = require('mongoose');
const faker = require('faker');
const Product = require('../../src/models/product.model');

const productOne = {
  _id: mongoose.Types.ObjectId(),
  productName: faker.name.findName(),
  productDescription: faker.lorem.paragraph(),
  productPrice: faker.commerce.price(),
  productCategory: 'clothes',
  productImage: faker.image.imageUrl(),
  productQuantity: faker.random.number(),
  productSeller: faker.name.findName(),
  productSku: faker.random.number(),
};

const productTwo = {
  _id: mongoose.Types.ObjectId(),
  productName: faker.name.findName(),
  productDescription: faker.lorem.paragraph(),
  productPrice: faker.commerce.price(),
  productCategory: 'clothes',
  productImage: faker.image.imageUrl(),
  productQuantity: faker.random.number(),
  productSeller: faker.name.findName(),
  productSku: faker.random.number(),
};

const insertProducts = async (products) => {
  await Product.insertMany(products);
};

module.exports = {
  productOne,
  productTwo,
  insertProducts,
};
