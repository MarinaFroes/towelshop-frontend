import React, { useState, useEffect } from "react";
import { Container, Message } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import CartProducts from "../components/CartProducts";
import CartInfo from "../components/CartInfo";
import LoaderComponent from "../components/LoaderComponent";
import {
  cartResetSuccess,
  getCart,
  removeFromCart,
} from "../redux/actions/cart";
import { AppState } from "../types";

const CartPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const { inCart, success, loading } = useSelector(
    (state: AppState) => state.cart
  );

  const { authedUser } = useSelector((state: AppState) => state.userLogin);

  useEffect(() => {
    if (!inCart || success) {
      dispatch(getCart());
      dispatch(cartResetSuccess());
    }
  }, [inCart, dispatch, success]);

  const handleRemoveFromCart = (productId: string) => {
    if (productId) {
      dispatch(removeFromCart(productId));
    } else {
      setErrorMessage("Could not remove product");
    }
  };

  return (
    <Container text style={{ margin: "2em" }}>
      {errorMessage && <Message error header="Oops!" content={errorMessage} />}
      {loading ? (
        <LoaderComponent />
      ) : (
        (inCart || !authedUser) && (
          <>
            <CartProducts
              handleRemoveFromCart={handleRemoveFromCart}
              user={authedUser}
              cartProducts={inCart ? inCart.products : null}
            />
            <CartInfo
              cartProducts={inCart ? inCart.products : null}
              handleCheckout={() => console.log("checkout")}
            />
          </>
        )
      )}
    </Container>
  );
};

export default CartPage;
