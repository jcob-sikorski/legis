import { Site } from "../../models/Site";
import { User } from "../../models/User";
import { SET_SITE, SET_USER } from "../constants";

// _id: Realm.BSON.ObjectId;
// user_id: Realm.BSON.ObjectId;

// deleted: Realm.Types.Int;
// status?: Realm.Types.Int;
// action?: Realm.Types.Int;

// type?: Realm.List<string>;
// host?: Realm.List<string>;
// target?: Realm.List<string>;

export function setSite(payloadProp: Site) {

    let payload = JSON.parse(JSON.stringify(payloadProp));

    // THIS CONVERTS TO REGULAR JS TYPES
    // ids
    if (payload._id) payload._id = payload._id.toString()
    if (payload.user_id) payload.user_id = payload.user_id.toString()
    // ints
    if (payload.deleted) payload.deleted = payload.deleted.toInt()
    if (payload.status) payload.status = payload.status.toInt()
    if (payload.action) payload.action = payload.action.toInt()
    // string lists
    if (payload.type) payload.type = payload.type.toArray()
    if (payload.host) payload.host = payload.host.toArray()
    if (payload.target) payload.target = payload.target.toArray()

    return {
        type: SET_SITE,
        payload,
    };
}

export function setUser(payload: User) {
    return {
        type: SET_USER,
        payload: payload
    };
}
