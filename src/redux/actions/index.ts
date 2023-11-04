import Site from "../../models/Site";
import User from "../../models/User";
import { SET_SITE, SET_USER } from "../constants";

export function setSite(payload: Site) {
    return {
        type: SET_SITE,
        payload
    };
}

export function setUser(payload: User) {
    return {
        type: SET_USER,
        payload: payload
    };
}
