import { addUser } from "./addUser";
import { updateUser } from "./updateUser";
import { deleteUser } from "./deleteUser";
import { getUserById } from "./getUserById";
import { Dependencies } from "../../dependencies";

export default (dependencies: Dependencies) => {
   return {
      addUser: addUser(dependencies),
      updateUser: updateUser(dependencies),
      deleteUser: deleteUser(dependencies),
      getUserById: getUserById(dependencies),
   };
};
