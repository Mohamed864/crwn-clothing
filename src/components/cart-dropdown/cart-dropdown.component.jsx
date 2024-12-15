import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButon from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, dispatch }) => {
  const navigate = useNavigate();

  // Navigate to checkout page

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButon
        onClick={() => {
          navigate("/checkout");
          dispatch(toggleCartHidden());
          // its good for  when i want to checkout the menu will disappear
        }}
      >
        GO TO CHECKOUT
      </CustomButon>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems, //using selector library
});

export default connect(mapStateToProps)(CartDropdown);
