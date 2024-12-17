import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

/*
The error you're seeing, TypeError: collections.map is not a function, typically occurs when you're trying to call the .map() method on something that is not an array. In this case, it seems that collections is not an array when you try to map over it in your CollectionOverview component.

Let’s go through a few debugging steps to resolve the issue:


The Object.values() method converts an object into an array of its values,
*/
export const selectCollections = createSelector([selectShop], (shop) => {
  return shop.collections;
});

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => {
    return collections
      ? Object.keys(collections).map((key) => collections[key])
      : [];
  }
);

//data normalization so i needd to change the array to object

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );
