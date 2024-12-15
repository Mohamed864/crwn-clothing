import React from "react";
import { connect } from "react-redux";

import CustomButon from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CustomButon>GO TO CHECKOUT</CustomButon>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems, //using selector library
});

export default connect(mapStateToProps)(CartDropdown);
