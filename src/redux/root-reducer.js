// root.reducer.js

import { combineReducers } from "redux";
import userReducer from "./user/user.reducer"; // Import your user reducer
import cartReducer from "./cart/cart.reducer";

const rootReducer = combineReducers({
  user: userReducer, // Add user reducer here
  cart: cartReducer,
});

export default rootReducer;
