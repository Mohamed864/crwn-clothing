import React from 'react';
import {Route, Routes} from 'react-router-dom';

import './App.css';


import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component.jsx';

import Header from './components/header/header.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import { onSnapshot } from 'firebase/firestore';

class App extends React.Component {
  constructor(){
    super();

    this.state= {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userDocRef = await createUserProfileDocument(userAuth);

        if (userDocRef) {
          onSnapshot(userDocRef, (snapShot) => {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            });
          });
        }
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route exact path='/' element={<HomePage />} /> 
          <Route path='/shop' element={<ShopPage />} /> 
          <Route path='/signin' element={<SignInAndSignUpPage />} /> 
        </Routes>  
      </div>
    );
  }  
  
}

export default App;
