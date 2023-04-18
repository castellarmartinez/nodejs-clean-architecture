import { Chance } from "chance";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../../../../src/entities";
import { orderRepository } from "../../../../src/frameworks/repositories/inMemory";

const chance = new Chance();

jest.mock("uuid", () => ({
  v4: () => "444b10a3-02f2-4029-8617-5a5a3fd1f37e",
}));

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

describe("test suit for orders repository", () => {
  let mockedOrderData: any;

  beforeEach(() => {
    jest.resetAllMocks();

    mockedOrderData = {
      id: uuidv4(),
      userdId: uuidv4(),
      productsId: [uuidv4(), uuidv4()],
      date: new Date(),
      isPayed: chance.bool(),
      meta: {
        delivery: "urgent",
      },
    };
  });

  it("should add and return a new order with custom values", async () => {
    const orderData = new Order(mockedOrderData);
    const newOrder = await orderRepository.add(orderData);

    expect(newOrder).toEqual(orderData);
    expect(newOrder.id).toBe(orderData.id);
    expect(newOrder.productsId).toEqual(orderData.productsId);
    expect(newOrder.userId).toBe(orderData.userId);
    expect(newOrder.date).toBe(orderData.date);
    expect(newOrder.isPayed).toBe(orderData.isPayed);
    expect(newOrder.meta).toBe(orderData.meta);

    await orderRepository.remove(newOrder);
  });

  it("should add and return a new order with default values", async () => {
    const orderData = new Order({});
    const newOrder = await orderRepository.add(orderData);

    expect(newOrder).toEqual(orderData);
    expect(newOrder.id).toBe(orderData.id)
    expect(newOrder.userId).toBeUndefined();
    expect(newOrder.productsId).toEqual([]);
    expect(newOrder.date).toEqual(new Date());
    expect(newOrder.isPayed).toBeFalsy();
    expect(newOrder.meta).toEqual({});

    await orderRepository.remove(newOrder);
  });

  it("should delete an existing order", async () => {
    const orderData = new Order(mockedOrderData);
    await orderRepository.add(orderData);
    const orders = await orderRepository.remove(orderData);

    expect(orders).toEqual([]);
  });

  it("should fail to delete an order", async () => {
    const orderData = new Order(mockedOrderData);
    const orders = await orderRepository.remove(orderData);

    expect(orders).toBeNull();
  });

  it("should update an existing order", async () => {
    const orderData = new Order(mockedOrderData);
    const newOrder = await orderRepository.add(orderData);

    mockedOrderData = {
      id: uuidv4(),
      userdId: uuidv4(),
      productsId: [uuidv4()],
      date: new Date(),
      meta: {
        delivery: "normal delivery",
      },
    };

    const neworderData = new Order(mockedOrderData);
    const order = await orderRepository.update(neworderData);

    expect(order).toEqual(neworderData);
    expect(order?.id).toBe(neworderData.id);
    expect(order?.productsId).toBe(neworderData.productsId);
    expect(order?.userId).toBeUndefined();
    expect(order?.date).toBe(neworderData.date);
    expect(order?.isPayed).toBeFalsy();
    expect(order?.meta).toBe(neworderData.meta);

    await orderRepository.remove(newOrder);
  });

  it("should fail to update an order due to invalid order", async () => {
    const orderData = new Order(mockedOrderData);
    const newOrder = await orderRepository.add(orderData);

    mockedOrderData = {
      id: "0362249f-6a2b-4d89-93ab-7d46530eb08a",
      productsId: [uuidv4()],
      date: new Date(),
      meta: {
        delivery: "normal delivery",
      },
    };

    const neworderData = new Order(mockedOrderData);
    const user = await orderRepository.update(neworderData);

    expect(user).toBeNull();
    await orderRepository.remove(newOrder);
  });

  it("should get an existing order by id", async () => {
    const orderData = new Order(mockedOrderData);
    const newOrder = await orderRepository.add(orderData);
    const order = await orderRepository.getById(newOrder.id!);

    expect(order).toBeDefined();
    expect(order?.id).toBe(newOrder.id);
    expect(order?.userId).toBe(newOrder.userId);
    expect(order?.productsId).toBe(newOrder.productsId);;
    expect(order?.date).toEqual(new Date());
    expect(order?.isPayed).toBe(newOrder.isPayed);
    expect(order?.meta).toEqual(newOrder.meta);

    await orderRepository.remove(newOrder);
  });

  it("should fail to get an order by id", async () => {
    const order = await orderRepository.getById(mockedOrderData.id);

    expect(order).toBeUndefined();
  });
});
