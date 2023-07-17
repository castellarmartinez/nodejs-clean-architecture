import mongoose from "mongoose";

import { productchema } from "../../database/mongo/schemas";
import { Product } from "../../../entities";

export class ProductRepository {
  entityName = "Product";
  Product = mongoose.model(this.entityName, productchema);

  async add(product: Product) {
    const mongoObject = new this.Product({ ...product, createdAt: new Date() });
    return mongoObject.save();
  }

  async update(updatedProduct: Product) {
    const { id } = updatedProduct;
    delete updatedProduct.id;

    return this.Product.findByIdAndUpdate(
      id,
      {
        ...updatedProduct,
        updatedAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async remove(id: string) {
    return this.Product.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async getById(id: string) {
    return this.Product.findOne({ _id: id });
  }
}
