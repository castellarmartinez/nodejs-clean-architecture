import { Chance } from "chance";
import { v4 as uuidv4 } from "uuid";
import { User, constants } from "../../../../src/entities";
import { userRepository } from "../../../../src/frameworks/repositories/inMemory";

const chance = new Chance();

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
    }
  })
  it("should add and return a new user with custom values", async () => {
    const mockUser = new User(mockData);
    const newUser = await userRepository.add(mockUser);

    expect(newUser).toEqual(mockUser);
    expect(newUser.name).toBe(mockUser.name);
    expect(newUser.lastName).toBe(mockUser.lastName);
    expect(newUser.gender).toBe(mockUser.gender);
    expect(newUser.meta).toBe(mockUser.meta);
  });

  it("should add and return a new user with default values", async () => {
    const userData = new User({});
    const newUser = await userRepository.add(userData);

    expect(newUser).toEqual(userData);
    expect(newUser.name).toBeNull();
    expect(newUser.lastName).toBeNull();
    expect(newUser.gender).toBe(constants.Genders.NOT_SPECIFIED);
    expect(newUser.meta).toEqual({});
  });

  it("should delete an existing user", async () => {

  });

  it("should update an existing user", async () => {});

  it("should get an existing user by id", async () => {
    const mockUser = new User(mockData);
    await userRepository.add(mockUser);
    const user = await userRepository.getById(mockData.id);

    expect(user).toBeDefined();
    expect(user?.name).toBe(mockData.name);
    expect(user?.lastName).toBe(mockData.lastName);
    expect(user?.gender).toBe(mockData.gender);
    expect(user?.meta).toBe(mockData.meta);
  });

  it("should fail to get an user by id", async () => {
    const user = await userRepository.getById(mockData.id);
   
    expect(user).toBeUndefined();
  });
});
