export const httpErrors = {
  NOT_FOUND: {
    httpCode: 404,
    code: "NOT_FOUND",
    message: "Element not found",
  },
  USER_REPOSITORY_NOT_FOUD: {
    httpCode: 404,
    code: "USER_REPOSITORY_NOT_FOUD",
    message: "The user repository should exist in dependencies",
  },
  PRODUCT_REPOSITORY_NOT_FOUD: {
    httpCode: 404,
    code: "PRODUCT_REPOSITORY_NOT_FOUD",
    message: "The product repository should exist in dependencies",
  },
  ORDER_REPOSITORY_NOT_FOUD: {
    httpCode: 404,
    code: "ORDER_REPOSITORY_NOT_FOUD",
    message: "The order repository should exist in dependencies",
  },
  INTERNAL_ERROR: {
    httpCode: 500,
    code: "INTERNAL_ERROR",
    message: "An internal server error occurred",
  },
};
