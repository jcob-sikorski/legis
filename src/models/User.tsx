import { Realm } from "@realm/react";

export class User extends Realm.Object<User> {
  _id: Realm.BSON.ObjectId;
  email?: string;

  constructor(realm: Realm, _id: Realm.BSON.ObjectId, email: string) {
    super(realm, { _id, email});
  }
};