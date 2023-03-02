import { Chance } from "chance";
import { User, constants } from "../../../../src/entities";
import { userRepository } from "../../../../src/frameworks/repositories/inMemory";

const chance = new Chance();

describe("users repository tests", () => {

  it("should add and return a new user with custom values", async () => {
    const userData = new User({
      name: chance.name(),
      lastName: chance.last(),
      gender: constants.Genders.FEMALE,
      meta: {
        hair: {
          color: "black",
        },
      },
    });

    const newUser = await userRepository.add(userData);

    expect(newUser).toEqual(userData);
    expect(newUser.name).toBe(userData.name);
    expect(newUser.lastName).toBe(userData.lastName);
    expect(newUser.gender).toBe(userData.gender);
    expect(newUser.meta).toBe(userData.meta);
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

  it("should delete an existing user", async () => {});

  it("should update an existing user", async () => {});

  it("should get an existing user by id", async () => {});
});
