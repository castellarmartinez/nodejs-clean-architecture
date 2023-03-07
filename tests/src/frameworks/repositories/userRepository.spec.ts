import { Chance } from "chance";
import { v4 as uuidv4 } from "uuid";
import { User, constants } from "../../../../src/entities";
import { userRepository } from "../../../../src/frameworks/repositories/inMemory";

const chance = new Chance();

jest.mock("uuid", () => ({
  v4: () => "444b10a3-02f2-4029-8617-5a5a3fd1f37e",
}));

describe("users repository tests", () => {
  let mockData: any;

  beforeEach(() => {
    jest.resetAllMocks();

    mockData = {
      id: uuidv4(),
      name: chance.name(),
      lastName: chance.last(),
      gender: constants.Genders.FEMALE,
      meta: {
        hair: {
          color: "black",
        },
      },
    };
  });

  it("should add and return a new user with custom values", async () => {
    const mockUser = new User(mockData);
    const newUser = await userRepository.add(mockUser);

    expect(newUser).toEqual(mockUser);
    expect(newUser.name).toBe(mockUser.name);
    expect(newUser.lastName).toBe(mockUser.lastName);
    expect(newUser.gender).toBe(mockUser.gender);
    expect(newUser.meta).toBe(mockUser.meta);

    await userRepository.remove(newUser);
  });

  it("should add and return a new user with default values", async () => {
    const userData = new User({});
    const newUser = await userRepository.add(userData);

    expect(newUser).toEqual(userData);
    expect(newUser.name).toBeNull();
    expect(newUser.lastName).toBeNull();
    expect(newUser.gender).toBe(constants.Genders.NOT_SPECIFIED);
    expect(newUser.meta).toEqual({});

    await userRepository.remove(newUser);
  });

  it("should delete an existing user", async () => {
    const mockUser = new User(mockData);
    await userRepository.add(mockUser);
    const users = await userRepository.remove(mockUser);

    expect(users).toEqual([]);
  });

  it("should fail to delete an user", async () => {
    const mockUser = new User(mockData);
    const users = await userRepository.remove(mockUser);

    expect(users).toBeNull();
  });

  it("should update an existing user", async () => {});

  it("should get an existing user by id", async () => {
    const mockUser = new User(mockData);
    const newUser = await userRepository.add(mockUser);
    const user = await userRepository.getById(mockData.id);

    expect(user).toBeDefined();
    expect(user?.name).toBe(mockData.name);
    expect(user?.lastName).toBe(mockData.lastName);
    expect(user?.gender).toBe(mockData.gender);
    expect(user?.meta).toBe(mockData.meta);

    await userRepository.remove(newUser);
  });

  it("should fail to get an user by id", async () => {
    const user = await userRepository.getById(mockData.id);

    expect(user).toBeUndefined();
  });
});
