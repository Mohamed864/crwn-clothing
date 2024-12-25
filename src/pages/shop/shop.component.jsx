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
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverViewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(ConnectedCollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const firestore = getFirestore(app); // Initialize Firestore
    const collectionRef = collection(firestore, "collections"); // Access the "collections" collection
    console.log("Collection reference:", collectionRef);
    onSnapshot(collectionRef, async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromSnapshot) {
      this.unsubscribeFromSnapshot();
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Routes>
          {/* Update Routes with element prop */}
          <Route
            path="/"
            element={<CollectionsOverViewWithSpinner isLoading={loading} />}
          />
          <Route
            path="/:collectionId"
            element={<CollectionPageWithSpinner isLoading={loading} />}
          />
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
