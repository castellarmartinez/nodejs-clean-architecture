import { Chance } from "chance";
import { v4 as uuidv4 } from "uuid";

import { Dependencies } from "../../../src/dependencies";
import { OrderRepository, UserRepository, ProductRepository } from "../../../src/frameworks/repositories/inMemory";
import { Constants } from "../../../src/constants";
import { orderUseCase } from "../../../src/useCases/orders";
import { Product, User, constants } from "../../../src/entities";

jest.mock("uuid", () => ({
  v4: () => "444b10a3-02f2-4029-8617-5a5a3fd1f37e",
}));

jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));

const chance = new Chance();

describe("tests for order use case", () => {
  let mockedOrderData: any;
  let mockedUpdatedOrder: any;
  const useCase = orderUseCase;
  let dependencies: Dependencies;
  let orderRepository: OrderRepository;
  let userRepository: UserRepository;
  let productRepository: ProductRepository;
  const userId = "444e10a3-02f2-4029-8637-5a5a3fd1f37e";
  const productId = "444e10a3-02f2-4029-8637-6a6a3fd1f37e";
  const user: User = {
    id: userId,
    lastName: "Castellar",
    name: "David",
    gender: constants.Genders.MALE,
    meta: {},
  };
  const product: Product = {
    id: productId,
    name: "David",
    description: "This is an example product",
    images: [{}],
    price: 1000,
    color: chance.color(),
    meta: {},
  };

  beforeEach(() => {
    jest.resetAllMocks();

    mockedOrderData = {
      id: uuidv4(),
      date: new Date(),
      isPayed: chance.bool(),
      meta: {
        texture: "silk",
      },
      userId,
      productsId: [productId],
    };

    mockedUpdatedOrder = {
      id: uuidv4(),
      date: new Date(),
      isPayed: chance.bool(),
      meta: {
        texture: "wooden",
      },
      userId,
      productsId: [productId],
    };

    orderRepository = {
      add: jest.fn().mockResolvedValue(mockedOrderData),
      update: jest.fn().mockResolvedValue(mockedUpdatedOrder),
      remove: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockResolvedValue(mockedOrderData),
    };

    userRepository = {
      getById: jest.fn().mockResolvedValue(user),
      add: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    productRepository = {
      getById: jest.fn().mockResolvedValue(product),
      add: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    dependencies = {
      userRepository,
      productRepository,
      orderRepository,
    } as Dependencies;
  });

  it("should be successful in adding a new order", async () => {
    const addOrder = useCase.addOrder(dependencies);

    await expect(addOrder(mockedOrderData)).resolves.toMatchObject(mockedOrderData);
  });

  it("should fail when adding a new order due to a missing dependencie", async () => {
    dependencies.orderRepository = undefined as any;

    expect(() => useCase.addOrder(dependencies)).toThrow(
      Constants.httpErrors.ORDER_REPOSITORY_NOT_FOUD.message
    );
  });

  it("should be successful in getting an order by id", async () => {
    const getOrderById = useCase.getOrderById(dependencies);

    await expect(getOrderById(mockedOrderData.id)).resolves.toMatchObject(mockedOrderData);
  });

  it("should fail when getting an order by id due to a missing dependencie", async () => {
    dependencies.orderRepository = undefined as any;

    expect(() => useCase.getOrderById(dependencies)).toThrow(
      Constants.httpErrors.ORDER_REPOSITORY_NOT_FOUD.message
    );
  });

  it("should be successful in updating an order", async () => {
    const updateOrder = useCase.updateOrder(dependencies);

    await expect(updateOrder(mockedUpdatedOrder)).resolves.toMatchObject(mockedUpdatedOrder);
  });

  it("should fail when updating an order due to a missing dependencie", async () => {
    dependencies.orderRepository = undefined as any;

    expect(() => useCase.updateOrder(dependencies)).toThrow(
      Constants.httpErrors.ORDER_REPOSITORY_NOT_FOUD.message
    );
  });

  it("should be successful in deleting an order", async () => {
    const deleteOrder = useCase.deleteOrder(dependencies);

    await expect(deleteOrder(mockedOrderData)).resolves.toMatchObject([]);
  });

  it("should fail when deleting an order due tu a non existing order", async () => {
    dependencies.orderRepository.remove = jest.fn().mockResolvedValue(null);

    const deleteOrder = useCase.deleteOrder(dependencies);

    await expect(deleteOrder("")).resolves.toBeNull();
  });

  it("should fail when deleting an order due to a missing dependencie", async () => {
    dependencies.orderRepository = undefined as any;

    expect(() => useCase.deleteOrder(dependencies)).toThrow(
      Constants.httpErrors.ORDER_REPOSITORY_NOT_FOUD.message
    );
  });
});
