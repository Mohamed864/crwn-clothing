import React from "react";
import { connect } from "react-redux";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";
import { onSnapshot } from "firebase/firestore";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import CheckoutPage from "./pages/checkout/checkout.component";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log("Auth state changed:", userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (snapShot) => {
          const data = snapShot.data();
          console.log("User data from Firestore:", data);
          setCurrentUser({
            id: snapShot.id,
            ...data,
            createdAt: data.createdAt
              ? data.createdAt.toDate().toISOString()
              : null, // Convert Timestamp to ISO string
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    //important to add shop/* to acc new param
    return (
      <div>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/shop/*" element={<ShopPage />} />
            <Route
              path="/signin"
              element={
                this.props.currentUser ? (
                  <Navigate to="/" replace />
                ) : (
                  <SignInAndSignUpPage />
                )
              }
            />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => {
    console.log("Dispatching setCurrentUser:", user); // Log before dispatch
    dispatch(setCurrentUser(user));
  },
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
