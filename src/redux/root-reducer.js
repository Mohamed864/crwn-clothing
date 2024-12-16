// root.reducer.js

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer"; // Import your user reducer
import cartReducer from "./cart/cart.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], //dy el 7aga el 3ayzz a3mlha store
};

const rootReducer = combineReducers({
  user: userReducer, // Add user reducer here
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
