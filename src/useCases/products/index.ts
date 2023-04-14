import { addProduct } from "./addProductUseCase";
import { getProductById } from "./getProductByIdUseCase";
import { updateProduct } from "./updateProductUseCase";
import { deleteProduct } from "./deleteProductUseCase";

export const userUseCase = { addProduct, getProductById, updateProduct, deleteProduct };
