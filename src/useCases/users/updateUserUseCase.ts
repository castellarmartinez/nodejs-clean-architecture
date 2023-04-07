import createHttpError from "http-errors";

import { User } from "../../entities";
import { Constants } from "../../constants";
import { UserType } from "../../entities/User";
import { Dependencies } from "../../dependencies";

export function updateUser(dependencies: Dependencies) {
  const { userRepository } = dependencies;

  if (!userRepository) {
    throw createHttpError(
      Constants.httpErrors.USER_REPOSITORY_NOT_FOUD.httpCode,
      JSON.stringify(Constants.httpErrors.USER_REPOSITORY_NOT_FOUD)
    );
  }

  return (input: UserType) => {
    const { id, name, lastName, gender, meta } = input;
    const user = new User({ id, name, lastName, gender, meta });

    return userRepository.update(user);
  };
}
