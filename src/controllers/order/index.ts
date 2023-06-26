import addOrder from "./addOrder";
import updateOrder from "./updateOrder";
import deleteOrder from "./deleteOrder";
import getOrderById from "./getOrderById";
import { Dependencies } from "../../dependencies";

export default (dependencies: Dependencies) => {
  return {
    addOrder: addOrder(dependencies),
    updateOrder: updateOrder(dependencies),
    deleteOrder: deleteOrder(dependencies),
    getOrderById: getOrderById(dependencies),
  };
};
