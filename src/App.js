import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";
//there is a new way to right routes in react course
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }
  //firebase config
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // Use the `onSnapshot` function for real-time updates
        onSnapshot(userRef, (snapShot) => {
          //console.log(snapShot.data());
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            } /*,
            () => {
              console.log(this.state);
            }*/
          );
          console.log(this.state);
        });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //make it null to get out from it
  }

  render() {
    return (
      <div>
        <Router>
          <Header currentUser={this.state.currentUser} />
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
export default App;
