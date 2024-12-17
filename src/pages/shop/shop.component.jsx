import React from "react";
import { Routes, Route } from "react-router-dom";
import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import ConnectedCollectionPage from "../collection/connet-collection-pag.component";

const ShopPage = () => {
  return (
    <div className="shop-page">
      <Routes>
        <Route path="/" element={<CollectionOverview />} />
        <Route path="/:collectionId" element={<ConnectedCollectionPage />} />
      </Routes>
    </div>
  );
};

export default ShopPage;
