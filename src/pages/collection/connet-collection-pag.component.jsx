import React from "react";
import { useParams } from "react-router-dom";
import CollectionPage from "./collection.component";

const ConnectedCollectionPage = (props) => {
  const { collectionId } = useParams(); // Get collectionId from URL params
  console.log("Collection ID from URL:", collectionId); // This should log the correct `collectionId` (e.g., 'hats')
  return <CollectionPage {...props} collectionId={collectionId} />; // Pass `collectionId` to CollectionPage as a prop
};

export default ConnectedCollectionPage;
