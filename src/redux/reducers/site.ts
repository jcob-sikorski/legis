import Site from "../../models/Site";
import { SET_SITE } from "../constants";

export default function siteReducer(
  state = {},
  { type, payload }: { type: string; payload: Site }
) {
  switch (type) {
    case SET_SITE: {
      return payload;
    }
    default:
      return state;
  }
}
