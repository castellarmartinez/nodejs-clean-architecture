import { Dependencies } from "../../dependencies";
import { validateUser } from "./validateUser";
import { validateProducts } from "./validateProducts";

export default (dependencies: Dependencies) => {
  return {
    validateUser: validateUser(dependencies),
    validateProducts: validateProducts(dependencies),
  };
};
