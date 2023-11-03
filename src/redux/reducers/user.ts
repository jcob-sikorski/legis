import { User } from "../../models/User"
import { SET_USER } from "../constants"

export default function userReducer(state = null, { type, payload }: { type: string, payload: User }) {
    switch (type) {
        case SET_USER:
            return payload
        default:
            return state
    }
}