const faker = require('faker');
const { Product } = require('../../../src/models');

describe('Product model', () => {
  describe('Product validation', () => {
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

    test('should correctly validate a valid product', async () => {
      await expect(new Product(newProduct).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if product name is invalid', async () => {
      newProduct.productName = '';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if product description is invalid', async () => {
      newProduct.productDescription = '';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if product price is invalid', async () => {
      newProduct.productPrice = 'LKJDJHKASDJH';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if product category is invalid', async () => {
      newProduct.productCategory = '';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if product image is invalid', async () => {
      newProduct.productImage = '';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if product quantity is invalid', async () => {
      newProduct.productQuantity = 'ASDDASD';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if product seller is invalid', async () => {
      newProduct.productSeller = '';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if product sku is invalid', async () => {
      newProduct.productSku = '';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });
  });

  describe('Product toJSON()', () => {
    test('should not return product password when toJSON is called', () => {
      const newProduct = {
        productName: faker.name.findName(),
        productDescription: faker.lorem.paragraph(),
        productPrice: faker.commerce.price(),
        productCategory: 'clothes',
        productImage: faker.image.imageUrl(),
        productQuantity: faker.random.number(),
        productSeller: faker.name.findName(),
        productSku: faker.random.number(),
      };
      expect(new Product(newProduct).toJSON()).not.toHaveProperty('password');
    });
  });
});
