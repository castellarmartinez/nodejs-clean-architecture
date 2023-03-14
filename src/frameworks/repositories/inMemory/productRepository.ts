import { inMemory as inMemoryDB } from "../../database";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../entities";

export async function add(product: Product) {
  if (!product.id) {
    product.id = uuidv4();
  }

  inMemoryDB.products.push(product);

  return product;
}

export async function update(updatedProduct: Product) {
  const index = inMemoryDB.products.findIndex((product) => product.id === updatedProduct.id);

  if (index >= 0) {
    inMemoryDB.products[index] = updatedProduct;
    return inMemoryDB.products[index];
  }

  return null;
}

export async function remove(productToRemove: Product) {
  const index = inMemoryDB.products.findIndex((product) => product.id === productToRemove.id);
  
  if (index >= 0) {
    inMemoryDB.products.splice(index, 1);

    return inMemoryDB.products;
  }

  return null;
}

export async function getById(id: string) {
  return inMemoryDB.products.find((product) => product.id === id);
}
