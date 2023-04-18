import { Chance } from "chance";
import { v4 as uuidv4 } from "uuid";

import { Dependencies } from "../../../src/dependencies";
import { ProductRepository } from "../../../src/frameworks/repositories/inMemory";
import { Constants } from "../../../src/constants";
import { productUseCase } from "../../../src/useCases/products";

jest.mock("uuid", () => ({
  v4: () => "444b10a3-02f2-4029-8617-5a5a3fd1f37e",
}));

const chance = new Chance();

describe("tests for user use case", () => {
  let mockedProductData: any;
  let mockedUpdatedProduct: any;
  let useCase = productUseCase;
  let dependencies: Dependencies;
  let productRepository: ProductRepository;

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

    mockedUpdatedProduct = {
      id: uuidv4(),
      name: chance.name(),
      description: chance.paragraph(),
      images: [],
      price: chance.dollar(),
      color: chance.color(),
      meta: {
        texture: "wool",
      },
    };

    productRepository = {
      add: jest.fn().mockResolvedValue(mockedProductData),
      update: jest.fn().mockResolvedValue(mockedUpdatedProduct),
      remove: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockResolvedValue(mockedProductData),
    };

    dependencies = {
      productRepository,
    } as Dependencies;
  });

  it("should be successful in adding a new product", async () => {
    const addProduct = useCase.addProduct(dependencies);

    await expect(addProduct(mockedProductData))
      .resolves
      .toMatchObject(mockedProductData);
  });

  it("should fail when adding a new product due to a missing dependencie", async () => {
    dependencies.productRepository = undefined as any;

    expect(() => useCase.addProduct(dependencies))
      .toThrow(Constants.httpErrors.PRODUCT_REPOSITORY_NOT_FOUD.message)
  });

  it("should be successful in getting a product by id", async () => {
    const getProductById = useCase.getProductById(dependencies);

    await expect(getProductById(mockedProductData.id))
      .resolves
      .toMatchObject(mockedProductData);
  });

  it("should fail when getting a product by id due to a missing dependencie", async () => {
    dependencies.productRepository = undefined as any;

    expect(() => useCase.getProductById(dependencies))
      .toThrow(Constants.httpErrors.PRODUCT_REPOSITORY_NOT_FOUD.message)
  });

  it("should be successful in updating a product", async () => {
    const updateProduct = useCase.updateProduct(dependencies);

    await expect(updateProduct(mockedUpdatedProduct))
      .resolves
      .toMatchObject(mockedUpdatedProduct);
  });

  it("should fail when updating a product due to a missing dependencie", async () => {
    dependencies.productRepository = undefined as any;

    expect(() => useCase.updateProduct(dependencies))
      .toThrow(Constants.httpErrors.PRODUCT_REPOSITORY_NOT_FOUD.message)
  });

  it("should be successful in deleting a product", async () => {
    const deleteProduct = useCase.deleteProduct(dependencies);

    await expect(deleteProduct(mockedProductData))
      .resolves
      .toMatchObject([]);
  });

  it("should fail when deleting a product due tu a non existing product", async () => {
    dependencies.productRepository.remove = jest.fn().mockResolvedValue(null);

    const deleteProduct = useCase.deleteProduct(dependencies);

    await expect(deleteProduct())
      .resolves
      .toBeNull();
  });

  it("should fail when deleting a product due to a missing dependencie", async () => {
    dependencies.productRepository = undefined as any;

    expect(() => useCase.deleteProduct(dependencies))
      .toThrow(Constants.httpErrors.PRODUCT_REPOSITORY_NOT_FOUD.message)
  });
});
