// user.types.js
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SIGN_OUT_USER = "SIGN_OUT_USER";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      /*console.log("Current User Payload:", action.payload);
      console.log("State before update:", state);*/
      return {
        ...state,
        currentUser: action.payload,
      };
    case SIGN_OUT_USER:
      //console.log("State before sign-out:", state);
      return {
        ...state,
        currentUser: null,
      };
    default:
      //console.log("State in default case:", state);
      return state;
  }
};

export default userReducer;
