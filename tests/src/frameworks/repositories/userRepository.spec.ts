import { Chance } from "chance";
import { v4 as uuidv4 } from "uuid";
import { User, constants } from "../../../../src/entities";
import { UserRepository } from "../../../../src/frameworks/repositories/inMemory";

const chance = new Chance();

jest.mock("uuid", () => ({
  v4: () => "444b10a3-02f2-4029-8617-5a5a3fd1f37e",
}));

describe("users repository tests", () => {
  let mockedUserData: any;
  const userRepository = new UserRepository();

  beforeEach(() => {
    jest.resetAllMocks();

    mockedUserData = {
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

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should add and return a new user with custom values", async () => {
    const userData = new User(mockedUserData);
    const newUser = await userRepository.add(userData);

    expect(newUser).toMatchObject({
      name: userData.name,
      lastName: userData.lastName,
      gender: userData.gender,
      meta: userData.meta,
    });

    await userRepository.remove(String(newUser.id));
  });

  it("should add and return a new user with default values", async () => {
    const userData = new User({});
    const newUser = await userRepository.add(userData);

    expect(newUser).toMatchObject({
      name: undefined,
      lastName: undefined,
      gender: constants.Genders.NOT_SPECIFIED,
      meta: {},
    });

    await userRepository.remove(String(newUser.id));
  });

  it("should delete an existing user", async () => {
    const userData = new User(mockedUserData);
    await userRepository.add(userData);
    const users = await userRepository.remove(String(userData.id));

    expect(users).toBeTruthy();
  });

  it("should fail to delete an user", async () => {
    const userData = new User(mockedUserData);
    const users = await userRepository.remove(String(userData.id));

    expect(users).toBeNull();
  });

  it("should update an existing user", async () => {
    const userData = new User(mockedUserData);
    const newUser = await userRepository.add(userData);

    mockedUserData = {
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

    const newUserData = new User(mockedUserData);
    const user = await userRepository.update(newUserData);

    expect(user).toMatchObject({
      name: newUserData.name,
      lastName: newUserData.lastName,
      gender: newUserData.gender,
      meta: newUserData.meta,
    });

    await userRepository.remove(String(newUser!.id));
  });

  it("should fail to update an user due to invalid user", async () => {
    const userData = new User(mockedUserData);
    const newUser = await userRepository.add(userData);

    mockedUserData = {
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

    const newUserData = new User(mockedUserData);
    const user = await userRepository.update(newUserData);

    expect(user).toBeNull();
    await userRepository.remove(String(newUser!.id));
  });

  it("should get an existing user by id", async () => {
    const userData = new User(mockedUserData);
    const newUser = await userRepository.add(userData);
    const user = await userRepository.getById(newUser.id as string);

    expect(user).toMatchObject({
      name: newUser.name,
      lastName: newUser.lastName,
      gender: newUser.gender,
      meta: newUser.meta,
    });

    await userRepository.remove(String(user!.id));
  });

  it("should fail to get an user by id", async () => {
    const user = await userRepository.getById(mockedUserData.id);

    expect(user).toBeUndefined();
  });
});
