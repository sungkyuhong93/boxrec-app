import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
}
