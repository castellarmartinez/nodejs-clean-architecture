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
  let mockedUserData: any;
  let mockedUpdatedUser: any;
  const useCase = userUseCase;
  let dependencies: Dependencies;
  let userRepository: UserRepository;

  beforeEach(() => {
    jest.resetAllMocks();

    mockedUserData = {
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

    mockedUpdatedUser = {
      id: uuidv4(),
      name: chance.name(),
      lastName: chance.last(),
      gender: constants.Genders.FEMALE,
      meta: {
        hair: {
          color: "green",
        },
      },
    };

    userRepository = {
      add: jest.fn().mockResolvedValue(mockedUserData),
      update: jest.fn().mockResolvedValue(mockedUpdatedUser),
      remove: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockResolvedValue(mockedUserData),
    };

    dependencies = {
      userRepository,
    } as Dependencies;
  });

  it("should be successful in adding a new user", async () => {
    const addUser = useCase.addUser(dependencies);

    await expect(addUser(mockedUserData)).resolves.toMatchObject(
      mockedUserData
    );
  });

  it("should fail when adding a new user due to a missing dependencie", async () => {
    dependencies.userRepository = undefined as any;

    expect(() => useCase.addUser(dependencies)).toThrow(
      Constants.httpErrors.USER_REPOSITORY_NOT_FOUD.message
    );
  });

  it("should be successful in getting a user by id", async () => {
    const getUserById = useCase.getUserById(dependencies);

    await expect(getUserById(mockedUserData.id)).resolves.toMatchObject(
      mockedUserData
    );
  });

  it("should fail when getting a user by id due to a missing dependencie", async () => {
    dependencies.userRepository = undefined as any;

    expect(() => useCase.getUserById(dependencies)).toThrow(
      Constants.httpErrors.USER_REPOSITORY_NOT_FOUD.message
    );
  });

  it("should be successful in updating a user", async () => {
    const updateUser = useCase.updateUser(dependencies);

    await expect(updateUser(mockedUpdatedUser)).resolves.toMatchObject(
      mockedUpdatedUser
    );
  });

  it("should fail when updating a user due to a missing dependencie", async () => {
    dependencies.userRepository = undefined as any;

    expect(() => useCase.updateUser(dependencies)).toThrow(
      Constants.httpErrors.USER_REPOSITORY_NOT_FOUD.message
    );
  });

  it("should be successful in deleting a user", async () => {
    const deleteUser = useCase.deleteUser(dependencies);

    await expect(deleteUser(mockedUserData)).resolves.toMatchObject([]);
  });

  it("should fail when deleting a user due tu a non existing user", async () => {
    dependencies.userRepository.remove = jest.fn().mockResolvedValue(null);

    const deleteUser = useCase.deleteUser(dependencies);

    await expect(deleteUser()).resolves.toBeNull();
  });

  it("should fail when deleting a user due to a missing dependencie", async () => {
    dependencies.userRepository = undefined as any;

    expect(() => useCase.deleteUser(dependencies)).toThrow(
      Constants.httpErrors.USER_REPOSITORY_NOT_FOUD.message
    );
  });
});
