import { Chance } from "chance";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../../src/entities";
import { ProductRepository } from "../../../../src/frameworks/repositories/inMemory";

const chance = new Chance();

jest.mock("uuid", () => ({
  v4: () => "444b10a3-02f2-4029-8617-5a5a3fd1f37e",
}));

describe("test suit for product repository", () => {
  let mockedProductData: any;
  const productRepository = new ProductRepository();

  beforeEach(() => {
    jest.resetAllMocks();

    mockedProductData = {
      id: uuidv4(),
      name: chance.name(),
      description: chance.paragraph(),
      images: [],
      price: chance.dollar(),
      color: chance.color(),
      meta: {
        texture: "silk",
      },
    };
  });

  it("should add and return a new product with custom values", async () => {
    const productData = new Product(mockedProductData);
    const newProduct = await productRepository.add(productData);

    expect(newProduct).toEqual(productData);
    expect(newProduct.name).toBe(productData.name);
    expect(newProduct.description).toBe(productData.description);
    expect(newProduct.images).toBe(productData.images);
    expect(newProduct.price).toBe(productData.price);
    expect(newProduct.color).toBe(productData.color);
    expect(newProduct.meta).toBe(productData.meta);

    await productRepository.remove(newProduct);
  });

  it("should add and return a new product with default values", async () => {
    const productData = new Product({});
    const newProduct = await productRepository.add(productData);

    expect(newProduct).toEqual(productData);
    expect(newProduct.name).toBeUndefined();
    expect(newProduct.description).toBeUndefined();
    expect(newProduct.images).toEqual([]);
    expect(newProduct.color).toBeUndefined();
    expect(newProduct.meta).toEqual({});

    await productRepository.remove(newProduct);
  });

  it("should delete an existing product", async () => {
    const productData = new Product(mockedProductData);
    await productRepository.add(productData);
    const products = await productRepository.remove(productData);

    expect(products).toEqual([]);
  });

  it("should fail to delete an product", async () => {
    const productData = new Product(mockedProductData);
    const products = await productRepository.remove(productData);

    expect(products).toBeNull();
  });

  it("should update an existing product", async () => {
    const productData = new Product(mockedProductData);
    const newProduct = await productRepository.add(productData);

    mockedProductData = {
      id: uuidv4(),
      name: chance.name(),
      description: chance.paragraph(),
      images: [],
      price: chance.dollar(),
      color: chance.color(),
      meta: {
        texture: "line",
      },
    };

    const newProductData = new Product(mockedProductData);
    const product = await productRepository.update(newProductData);

    expect(product).toEqual(newProductData);
    expect(product?.name).toBe(newProductData.name);
    expect(product?.description).toBe(newProductData.description);
    expect(product?.images).toBe(newProductData.images);
    expect(product?.price).toBe(newProductData.price);
    expect(product?.color).toBe(newProductData.color);
    expect(product?.meta).toBe(newProductData.meta);

    await productRepository.remove(newProduct);
  });

  it("should fail to update an product due to invalid product", async () => {
    const productData = new Product(mockedProductData);
    const newProduct = await productRepository.add(productData);

    mockedProductData = {
      id: "0362249f-6a2b-4d89-93ab-7d46530eb08a",
      name: chance.name(),
      description: chance.paragraph(),
      images: [],
      price: chance.dollar(),
      color: chance.color(),
      meta: {
        texture: "line",
      },
    };

    const newProductData = new Product(mockedProductData);
    const user = await productRepository.update(newProductData);

    expect(user).toBeNull();
    await productRepository.remove(newProduct);
  });

  it("should get an existing product by id", async () => {
    const productData = new Product(mockedProductData);
    const newProduct = await productRepository.add(productData);
    const product = await productRepository.getById(newProduct.id!);

    expect(product).toBeDefined();
    expect(product?.name).toBe(newProduct.name);
    expect(product?.description).toBe(newProduct.description);
    expect(product?.images).toBe(newProduct.images);
    expect(product?.price).toBe(newProduct.price);
    expect(product?.color).toBe(newProduct.color);
    expect(product?.meta).toBe(newProduct.meta);

    await productRepository.remove(newProduct);
  });

  it("should fail to get an product by id", async () => {
    const product = await productRepository.getById(mockedProductData.id);

    expect(product).toBeUndefined();
  });
});
