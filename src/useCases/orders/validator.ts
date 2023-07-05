import { isEmpty } from "lodash";

import { ValidationError } from "../../frameworks/common";
import useCases from "../index";
import { Dependencies } from "../../dependencies";
import { OrderType } from "../../entities/Order";


export default function (dependencies: Dependencies) {
  const { userUseCase, productUseCase } = useCases;
  const { getUserById } = userUseCase;
  const { getProductById } = productUseCase;

  if (!getUserById) {
    throw new Error("getUserByIdUseCase should be exist in dependencies");
  }

  if (!getProductById) {
    throw new Error("getUserByIdUseCase should be exist in dependencies");
  }

  const getUserByIdFunc = getUserById(dependencies);
  const getProductByIdFunc = getProductById(dependencies);

  return async (order: OrderType) => {
    const { userId, productsId = [] } = order;

    const products = await Promise.all(productsId.map(id => getProductByIdFunc(id)));

    const notFoundIds = products.reduce((acc: string[], product, i) => {
      if (!product) {
        acc.push(productsId[i]);
      }

      return acc;
    }, []);

    if (!isEmpty(notFoundIds)) {
      return new ValidationError({
        field: "productsId",
        msg: `No products with ids ${notFoundIds.join(", ")}`
      });
    }

    const user = await getUserByIdFunc(userId!);

    if (!user) {
      return new ValidationError({
        field: "userId",
        msg: `No user with id ${userId}`
      });
    }

    return undefined;
  };
}
