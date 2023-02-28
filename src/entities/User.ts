interface UserType {
  id?: number;
  name: string | null;
  lastName: string | null;
  gender: Genders;
  meta: any;
}

export class User {
  id: number | undefined;
  lastName: string | null;
  name: string | null;
  gender: Genders;
  meta: any;

  constructor({
    id,
    name = null,
    lastName = null,
    gender = Genders.NOT_SPECIFIED,
    meta = {},
  }: UserType) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.gender = gender;
    this.meta = meta;
  }
}

export enum Genders {
  NOT_SPECIFIED = 0,
  FEMALE = 1,
  MALE = 2,
}
