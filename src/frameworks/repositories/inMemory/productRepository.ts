import { inMemory as inMemoryDB } from "../../database";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../entities";

export class ProductRepository {
  async add(product: Product) {
    if (!product.id) {
      product.id = uuidv4();
    }

    inMemoryDB.products.push(product);

    return product;
  }

  async update(updatedProduct: Product) {
    const index = inMemoryDB.products.findIndex(
      (product) => product.id === updatedProduct.id
    );

    if (index >= 0) {
      inMemoryDB.products[index] = updatedProduct;
      return inMemoryDB.products[index];
    }

    return null;
  }

  async remove(id: string) {
    const index = inMemoryDB.products.findIndex((product) => product.id === id);

    if (index >= 0) {
      inMemoryDB.products.splice(index, 1);

      return true;
    }

    return null;
  }

  async getById(id: string) {
    return inMemoryDB.products.find((product) => product.id === id);
  }
}
