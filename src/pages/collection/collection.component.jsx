import React from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectCollection } from "../../redux/shop/shop.selector";
import "./collection.styles.scss";
import CollectionItem from "../../components/collection-item/collection-item.component";

// CollectionPage component to display collection details
const CollectionPage = ({ collection }) => {
  if (!collection) {
    return <div>Collection not found</div>;
  }

  const { title, items } = collection;

  return (
    <div className="collection-page">
      {
        <Link to={`/shop/${title.toLowerCase()}`}>
          <h2 className="title">{title}</h2>
        </Link>
      }
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// mapStateToProps gets the collectionId from props (not directly from useParams)
const mapStateToProps = (state, ownProps) => {
  const { collectionId } = ownProps; // Getting collectionId passed as a prop
  // console.log("Selected Collection:", collectionId); // Debugging

  // Using selectCollection to fetch collection from the Redux store
  return {
    collection: selectCollection(collectionId)(state),
  };
};

// ConnectedCollectionPage component that passes the collectionId to CollectionPage
// connet-collection-pag is the component of the bellow
/*
const ConnectedCollectionPage = (props) => {
  const { collectionId } = useParams(); // Getting collectionId from route params
  console.log("Collection ID from URL:", collectionId); // Debugging
  return <CollectionPage {...props} collectionId={collectionId} />; // Passing collectionId to CollectionPage
};*/

export default connect(mapStateToProps)(CollectionPage);
