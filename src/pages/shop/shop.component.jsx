import React from "react";
import { Routes, Route } from "react-router-dom";
import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import ConnectedCollectionPage from "../collection/connet-collection-pag.component";
import { collection, getFirestore } from "firebase/firestore";
import app from "../../firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";
import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const firestore = getFirestore(app); // Initialize Firestore
    const collectionRef = collection(firestore, "collections"); // Access the "collections" collection
    console.log("Collection reference:", collectionRef);
    onSnapshot(collectionRef, async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromSnapshot) {
      this.unsubscribeFromSnapshot();
    }
  }

  render() {
    return (
      <div className="shop-page">
        <Routes>
          <Route path="/" element={<CollectionOverview />} />
          <Route path="/:collectionId" element={<ConnectedCollectionPage />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
