// user.types.js
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SIGN_OUT_USER = "SIGN_OUT_USER";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log("state ahoooaa : ", state);
      return {
        ...state,
        currentUser: action.payload,
      };

    case SIGN_OUT_USER:
      return {
        ...state,
        currentUser: null,
      };
    default:
      console.log("state ahoooaa : ", state);
      return state;
  }
};

export default userReducer;
