import mongoose from "mongoose";

import { userSchema } from "../../database/mongo/schemas";
import { User } from "../../../entities";

export class UserRepository {
  entityName = "User";
  User = mongoose.model(this.entityName, userSchema);

  async add(user: User) {
    const mongoObject = new this.User({...user, createdAt: new Date()});
    return mongoObject.save();
  }

  async update(updatedUser: User): Promise<User | null> {
    const { id } = updatedUser;
    delete updatedUser.id;

    return this.User.findByIdAndUpdate(
      id,
      {
        ...updatedUser,
        updatedAt: new Date()
      },
      {
        new: true,
      }
    );
  }

  async remove(id: string): Promise<true | null> {
    return this.User.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date()
      },
      {
        new: true,
      }
    );
  }

  async getById(id: string) {
    return this.User.findOne({ _id: id });
  }
}

