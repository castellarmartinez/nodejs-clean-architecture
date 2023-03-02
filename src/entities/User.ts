interface UserType {
  id?: string;
  name?: string;
  lastName?: string;
  gender?: Genders;
  meta?: object;
}

export class User {
  id: string | undefined;
  lastName: string | null;
  name: string | null;
  gender: Genders;
  meta: object;

  constructor(input: UserType) {
    this.id = input.id;
    this.name = input.name || null;
    this.lastName = input.lastName || null
    this.gender = input.gender || Genders.NOT_SPECIFIED;
    this.meta = input.meta || {};
  }
}

export enum Genders {
  NOT_SPECIFIED = 0,
  FEMALE = 1,
  MALE = 2,
}
