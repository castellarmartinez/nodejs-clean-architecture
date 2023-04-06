import { Chance } from "chance";
import { v4 as uuidv4 } from "uuid";

import { userUseCase } from "../../../src/useCases/users";
import { constants } from "../../../src/entities";
import { Dependencies } from "../../../src/dependencies";
import { UserRepository } from "../../../src/frameworks/repositories/inMemory";
import { Constants } from "../../../src/constants";

jest.mock("uuid", () => ({
  v4: () => "444b10a3-02f2-4029-8617-5a5a3fd1f37e",
}));

const chance = new Chance();

describe("tests for user use case", () => {
  let mockUserData: any;
  let useCase = userUseCase;
  let dependencies: Dependencies;
  let userRepository: UserRepository;

  beforeEach(() => {
    jest.resetAllMocks();

    mockUserData = {
      id: uuidv4(),
      name: chance.name(),
      lastName: chance.last(),
      gender: constants.Genders.FEMALE,
      meta: {
        hair: {
          color: "red",
        },
      },
    };

    userRepository = {
      add: jest.fn().mockResolvedValue(mockUserData),
      update: jest.fn().mockResolvedValue({}),
      remove: jest.fn().mockResolvedValue({}),
      getById: jest.fn().mockResolvedValue({}),
    };

    dependencies = {
      userRepository,
    };
  });

  it("should success in adding a new user", async () => {
    const addUser = useCase.addUser(dependencies);

    await expect(addUser(mockUserData))
      .resolves
      .toMatchObject(mockUserData);
  });

  it("should fail in adding a new user due to a missing dependencie", async () => {
    dependencies.userRepository = undefined as any;

    expect(() => useCase.addUser(dependencies))
      .toThrow(Constants.httpErrors.USER_REPOSITORY_NOT_FOUD.message)
  });
});
