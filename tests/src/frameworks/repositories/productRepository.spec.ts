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

    expect(newProduct).toMatchObject({
      name: productData.name,
      description: productData.description,
      images: productData.images,
      price: productData.price,
      color: productData.color,
      meta: productData.meta,
    });

    await productRepository.remove(newProduct);
  });

  it("should add and return a new product with default values", async () => {
    const productData = new Product({});
    const newProduct = await productRepository.add(productData);

    expect(newProduct).toMatchObject({
      name: undefined,
      description: undefined,
      images: [],
      price: undefined,
      color: undefined,
      meta: {},
    });

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

    expect(product).toMatchObject({
      name: newProductData.name,
      description: newProductData.description,
      images: newProductData.images,
      price: newProductData.price,
      color: newProductData.color,
      meta: newProductData.meta,
    });

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

    expect(product).toMatchObject({
      name: newProduct.name,
      description: newProduct.description,
      images: newProduct.images,
      price: newProduct.price,
      color: newProduct.color,
      meta: newProduct.meta,
    });

    await productRepository.remove(newProduct);
  });

  it("should fail to get an product by id", async () => {
    const product = await productRepository.getById(mockedProductData.id);

    expect(product).toBeUndefined();
  });
});
