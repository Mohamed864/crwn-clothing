import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import { auth } from "./firebase/firebase.utils";
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
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user); //opened sub bet my website and firebase
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
