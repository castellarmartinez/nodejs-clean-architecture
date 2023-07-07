import { isEmpty } from "lodash";

import { ValidationError } from "../../frameworks/common";
import useCases from "../index";
import { Dependencies } from "../../dependencies";
import { OrderType } from "../../entities/Order";


export default function (dependencies: Dependencies) {
  const { userUseCase, productUseCase } = useCases;

  if (!userUseCase.getUserById) {
    throw new Error("getUserByIdUseCase should be exist in dependencies");
  }

  if (!productUseCase.getProductById) {
    throw new Error("getUserByIdUseCase should be exist in dependencies");
  }

  const getUserById = userUseCase.getUserById(dependencies);
  const getProductById = productUseCase.getProductById(dependencies);

  return async (order: OrderType) => {
    const { userId, productsId = [] } = order;

    const products = await Promise.all(productsId.map(id => getProductById(id)));

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

    const user = await getUserById(userId!);

    if (!user) {
      return new ValidationError({
        field: "userId",
        msg: `No user with id ${userId}`
      });
    }

    return undefined;
  };
}
