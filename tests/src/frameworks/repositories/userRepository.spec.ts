import { Chance } from "chance";
import { v4 as uuidv4 } from "uuid";
import { User, constants } from "../../../../src/entities";
import { userRepository } from "../../../../src/frameworks/repositories/inMemory";

const chance = new Chance();

jest.mock("uuid", () => ({
  v4: () => "444b10a3-02f2-4029-8617-5a5a3fd1f37e",
}));

describe("users repository tests", () => {
  let mockUserData: any;

  beforeEach(() => {
    jest.resetAllMocks();

    mockUserData = {
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
    const userData = new User(mockUserData);
    const newUser = await userRepository.add(userData);

    expect(newUser).toEqual(userData);
    expect(newUser.name).toBe(userData.name);
    expect(newUser.lastName).toBe(userData.lastName);
    expect(newUser.gender).toBe(userData.gender);
    expect(newUser.meta).toBe(userData.meta);

    await userRepository.remove(newUser);
  });

  it("should add and return a new user with default values", async () => {
    const userData = new User({});
    const newUser = await userRepository.add(userData);

    expect(newUser).toEqual(userData);
    expect(newUser.name).toBeUndefined();
    expect(newUser.lastName).toBeUndefined();
    expect(newUser.gender).toBe(constants.Genders.NOT_SPECIFIED);
    expect(newUser.meta).toEqual({});

    await userRepository.remove(newUser);
  });

  it("should delete an existing user", async () => {
    const userData = new User(mockUserData);
    await userRepository.add(userData);
    const users = await userRepository.remove(userData);

    expect(users).toEqual([]);
  });

  it("should fail to delete an user", async () => {
    const userData = new User(mockUserData);
    const users = await userRepository.remove(userData);

    expect(users).toBeNull();
  });

  it("should update an existing user", async () => {
    const userData = new User(mockUserData);
    const newUser = await userRepository.add(userData);

    mockUserData = {
      id: uuidv4(),
      name: chance.name(),
      lastName: chance.last(),
      gender: constants.Genders.MALE,
      meta: {
        hair: {
          color: "blonde",
        },
      },
    };

    const newUserData = new User(mockUserData);
    const user = await userRepository.update(newUserData);

    expect(user).toEqual(newUserData);
    expect(user?.name).toBe(newUserData.name);
    expect(user?.lastName).toBe(newUserData.lastName);
    expect(user?.gender).toBe(newUserData.gender);
    expect(user?.meta).toBe(newUserData.meta);

    await userRepository.remove(newUser);
  });

  it("should fail to update an user due to invalid user", async () => {
    const userData = new User(mockUserData);
    const newUser = await userRepository.add(userData);

    mockUserData = {
      id: "0362249f-6a2b-4d89-93ab-3d46530eb08a",
      name: chance.name(),
      lastName: chance.last(),
      gender: constants.Genders.MALE,
      meta: {
        hair: {
          color: "blonde",
        },
      },
    };

    const newUserData = new User(mockUserData);
    const user = await userRepository.update(newUserData);

    expect(user).toBeNull();
    await userRepository.remove(newUser);
  });

  it("should get an existing user by id", async () => {
    const userData = new User(mockUserData);
    const newUser = await userRepository.add(userData);
    const user = await userRepository.getById(newUser.id!);

    expect(user).toBeDefined();
    expect(user?.name).toBe(newUser.name);
    expect(user?.lastName).toBe(newUser.lastName);
    expect(user?.gender).toBe(newUser.gender);
    expect(user?.meta).toBe(newUser.meta);

    await userRepository.remove(newUser);
  });

  it("should fail to get an user by id", async () => {
    const user = await userRepository.getById(mockUserData.id);

    expect(user).toBeUndefined();
  });
});
