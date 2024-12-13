import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import rootReducer from "./root-reducer"; // Your combined reducers

const middlewares = [logger];

const store = configureStore({
  reducer: rootReducer, // Use "reducer" key for the root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false, // Disable immutability check
      serializableCheck: false, // Disable serializability check
    }).concat(...middlewares), // Add custom middlewares like logger
});

export default store;
