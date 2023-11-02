const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Product } = require('../../src/models');
const { productOne, insertProducts } = require('../fixtures/product.fixture');

setupTestDB();

describe('Product routes', () => {
  describe('POST /v1/products', () => {
    let newProduct;
    beforeEach(() => {
      newProduct = {
        productName: faker.name.findName(),
        productDescription: faker.lorem.paragraph(),
        productPrice: faker.commerce.price(),
        productCategory: 'clothes',
        productImage: faker.image.imageUrl(),
        productQuantity: faker.random.number(),
        productSeller: faker.name.findName(),
        productSku: faker.random.number(),
      };
    });
    test('should return 201 and successfully create new product if data is ok', async () => {
      await insertProducts([productOne]);
      const res = await request(app).post('/v1/products').send(newProduct).expect(httpStatus.CREATED);
      expect(res.body).toEqual({
        id: expect.anything(),
        productName: newProduct.productName,
        productDescription: newProduct.productDescription,
        productPrice: newProduct.productPrice,
        productCategory: newProduct.productCategory,
        productImage: newProduct.productImage,
        productQuantity: newProduct.productQuantity,
        productSeller: newProduct.productSeller,
        productSku: newProduct.productSku,
      });
      const dbProduct = await Product.findById(res.body.id);
      expect(dbProduct).toBeDefined();
      expect(dbProduct).toMatchObject({
        productName: newProduct.productName,
        productDescription: newProduct.productDescription,
        productPrice: newProduct.productPrice,
        productCategory: newProduct.productCategory,
        productImage: newProduct.productImage,
        productQuantity: newProduct.productQuantity,
        productSeller: newProduct.productSeller,
        productSku: newProduct.productSku,
      });
    });
    test('should return 400 error if productName is invalid', async () => {
      await insertProducts([productOne]);
      newProduct.productName = '';
      await request(app).post('/v1/products').send(newProduct).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if productDescription is invalid', async () => {
      await insertProducts([productOne]);
      newProduct.productDescription = '';
      await request(app).post('/v1/products').send(newProduct).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if productPrice is invalid', async () => {
      await insertProducts([productOne]);
      newProduct.productPrice = '';
      await request(app).post('/v1/products').send(newProduct).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if productCategory is invalid', async () => {
      await insertProducts([productOne]);
      newProduct.productCategory = '';
      await request(app).post('/v1/products').send(newProduct).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if productImage is invalid', async () => {
      await insertProducts([productOne]);
      newProduct.productImage = '';
      await request(app).post('/v1/products').send(newProduct).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if productQuantity is invalid', async () => {
      await insertProducts([productOne]);
      newProduct.productQuantity = '';
      await request(app).post('/v1/products').send(newProduct).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if productSeller is invalid', async () => {
      await insertProducts([productOne]);
      newProduct.productSeller = '';
      await request(app).post('/v1/products').send(newProduct).expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 error if productSku is invalid', async () => {
      await insertProducts([productOne]);
      newProduct.productSku = '';
      await request(app).post('/v1/products').send(newProduct).expect(httpStatus.BAD_REQUEST);
    });
  });
});
