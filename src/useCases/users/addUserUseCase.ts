import createError from "http-errors";

import { User } from "../../entities";
import { Constants } from "../../constants";
import { UserType } from "../../entities/User";
import { Dependencies } from "../../dependencies";

export function addUser(dependencies: Dependencies) {
  const { userRepository } = dependencies;

  if (!userRepository) {
    throw createError(
      Constants.httpErrors.USER_REPOSITORY_NOT_FOUD,
      JSON.stringify(Constants.httpErrors.USER_REPOSITORY_NOT_FOUD)
    );
  }

  return (input: UserType) => {
    const { name, lastName, gender, meta } = input;
    const user = new User({ name, lastName, gender, meta });

    return userRepository.add(user);
  };
}
