import { Chance } from "chance";
import { v4 as uuidv4 } from "uuid";

import { userUseCase } from "../../../src/useCases/users";
import { User, constants } from "../../../src/entities";
import { Dependencies } from "../../../src/dependencies";
import { UserRepository } from "../../../src/frameworks/repositories/inMemory";

jest.mock("uuid", () => ({
  v4: () => "444b10a3-02f2-4029-8617-5a5a3fd1f37e",
}));

const chance = new Chance();

describe("tests for user use case", () => {
  let mockUserData: any;
  let useCase: typeof userUseCase;
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

    dependencies = {
      userRepository,
    };
  });

  test("add user use case", async () => {
    const addUser = useCase.addUser(dependencies);

    const result = await addUser(mockUserData);

    expect(result).toBeDefined();
  });
});
