import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.commponent"; // Fixed the typo here
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.action"; // import action
import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const { setCurrentUser } = this.props;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      setCurrentUser(user); // Update Redux state with the signed-in user
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              onClick={() =>
                signInWithGoogle() && setCurrentUser(auth.currentUser)
              } // Set current user after Google sign in
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
