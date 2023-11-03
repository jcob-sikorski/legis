import { Realm } from "@realm/react";

export class Site extends Realm.Object<Site> {
  _id: Realm.BSON.ObjectId;
  user_id: Realm.BSON.ObjectId;
  title?: string;
  subtitle?: string;
  description?: string;
  deleted: Realm.Types.Int;
  image_url?: string;
  site_url?: string;
  status?: Realm.Types.Int;
  share_image_url?: string;
  favicon_url?: string;
  action?: Realm.Types.Int;
  type?: Realm.List<string>;
  host?: Realm.List<string>;
  target?: Realm.List<string>;
  repo_url?: string;

  static primaryKey = '_id';

  constructor(realm: Realm, _id: Realm.BSON.ObjectId, user_id: Realm.BSON.ObjectId, deleted: Realm.Types.Int) {
    super(realm, { _id, user_id, deleted});
  }
};