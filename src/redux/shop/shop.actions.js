import { collection } from "firebase/firestore";
import ShopActionTypes from "./shop.types";

export const updateCollections = (collectionsMap) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap,
});
