// root.reducer.js

import { combineReducers } from "redux";
import userReducer from "./user/user.reducer"; // Import your user reducer

const rootReducer = combineReducers({
  user: userReducer, // Add user reducer here
});

export default rootReducer;
