import { Site } from "../../models/Site"
import { SET_SITE } from "../constants"
import { Realm } from "@realm/react";

export default function siteReducer(state = {}, { type, payloadProp }: { type: string, payloadProp: Site }) {
    switch (type) {
        case SET_SITE: {

            let payload = JSON.parse(JSON.stringify(payloadProp));

            // THIS CONVERTS TO REALM TYPES
            // ids
            if (payload._id) payload._id = new Realm.BSON.ObjectId(payload._id) 
            if (payload.user_id) payload.user_id = new Realm.BSON.ObjectId(payload.user_id)
            // ints
            if (payload.deleted) payload.deleted = new Realm.Types.Int(payload.deleted)
            if (payload.status) payload.status = new Realm.Types.Int(payload.status)
            if (payload.action) payload.action = new Realm.Types.Int(payload.action)
            // string lists
            if (typeof payload?.type == 'object') payload.type = new Realm.List(payload.type) 
            if (typeof payload?.host == 'object') payload.host = new Realm.List(payload.host)
            if (typeof payload?.target == 'object') payload.target = new Realm.List(payload.target)

            return payload
        }
        default: 
            return state;
            
    }
}