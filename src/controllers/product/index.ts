import addProduct from "./addProduct";
import updateProduct from "./updateProduct";
import deleteProduct from "./deleteProduct";
import getProductById from "./getProductById";
import { Dependencies } from "../../dependencies";

export default (dependencies: Dependencies) => {
  return {
    addProduct: addProduct(dependencies),
    updateProduct: updateProduct(dependencies),
    deleteProduct: deleteProduct(dependencies),
    getProductById: getProductById(dependencies),
  };
};
