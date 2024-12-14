import React from "react";

import CustomButon from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => (
  <div className="cart-dropdown">
    <div className="cart-items" />
    <CustomButon>GO TO CHECKOUT</CustomButon>
  </div>
);

export default CartDropdown;
