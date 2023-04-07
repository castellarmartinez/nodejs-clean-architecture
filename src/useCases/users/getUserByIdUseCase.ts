import createHttpError from "http-errors";

import { Constants } from "../../constants";
import { Dependencies } from "../../dependencies";

export function getUserById(dependencies: Dependencies) {
  const { userRepository } = dependencies;

  if (!userRepository) {
    throw createHttpError(
      Constants.httpErrors.USER_REPOSITORY_NOT_FOUD.httpCode,
      JSON.stringify(Constants.httpErrors.USER_REPOSITORY_NOT_FOUD)
    );
  }

  return (id: string) => {
    return userRepository.getById(id);
  };
}