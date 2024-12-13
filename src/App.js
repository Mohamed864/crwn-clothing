import React from "react";
import { connect } from "react-redux";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";
import { onSnapshot } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";

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
    return (
      <div>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/signin" element={<SignInAndSignUpPage />} />
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

const mapStateToProps = (state) => {
  console.log("Redux state:", state); // Log the entire Redux state to track currentUser
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
