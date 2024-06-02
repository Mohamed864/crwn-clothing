import React from "react";

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import { signInWithEmailAndPassword  } from 'firebase/auth';

import './sigin-in.style.scss';

class SignIn extends React.Component {
    constructor(){
        super();



        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try{
            await signInWithEmailAndPassword (auth, email, password);
            this.setState({email: '', password: ''});
        }catch(error){
            console.error(error);
        }

        
    }

    handleChange = event => {
        const {value,name} = event.target;


        this.setState({[name]: value});
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit} action="">
                    <FormInput label="email"  type="email" name="email" handleChange={this.handleChange} value={this.state.email}  required/>
                    
                    <FormInput label="password" type="password" name="password"  value={this.state.password} handleChange={this.handleChange}  required/>
                    
                    <div className='buttons'>
                        <CustomButton type="submit" >Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in witn Google</CustomButton>
                    </div>
                </form>

            </div>
        )
    }
}

export default SignIn;