import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCollection } from "../../redux/shop/shop.selector";
import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { collectionId } = useParams(); // Use useParams here
  console.log(collection);

  return (
    <div className="collection-page">
      <h2>CATEGORY PAGE: {collectionId}</h2>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // Pass the collectionId from the component
  return {
    collection: selectCollection(ownProps.collectionId)(state),
  };
};

// Wrap the component with connect and pass the props properly
const ConnectedCollectionPage = (props) => {
  const { collectionId } = useParams(); // Retrieve the collectionId
  return <CollectionPage {...props} collectionId={collectionId} />;
};

export default connect(mapStateToProps)(ConnectedCollectionPage);
