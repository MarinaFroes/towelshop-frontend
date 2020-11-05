import { Dispatch } from "redux";

import {
  Cart,
  User,
  CartActions,
  AsyncAction,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAILURE,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAILURE,
  CART_RESET_SUCCESS,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAILURE,
} from "../../types";
import baseUrl from "../../util/baseUrl";

// CART DETAILS ACTION CREATORS
const cartDetailsRequest = (): CartActions => {
  return {
    type: CART_DETAILS_REQUEST,
  };
};

const cartDetailsSuccess = (cart: Cart): CartActions => {
  return {
    type: CART_DETAILS_SUCCESS,
    payload: {
      cart,
    },
  };
};

const cartDetailsFailure = (error: string): CartActions => {
  return {
    type: CART_DETAILS_FAILURE,
    error,
  };
};

export const getCart = (): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(cartDetailsRequest());

    const { userLogin } = getState();

    if (!userLogin || !userLogin.authedUser) {
      throw new Error("401: Login to continue");
    }

    const { token } = userLogin.authedUser as User;

    const response: any = await fetch(`${baseUrl}/api/v1/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      let cart = await response.json();

      dispatch(cartDetailsSuccess(cart));
    } else {
      throw new Error(`${response.status}: Could not fetch cart`);
    }
  } catch (err) {
    dispatch(cartDetailsFailure(err.message));
  }
};

// CART ADD ITEM ACTION CREATORS
const cartAddItemRequest = (): CartActions => {
  return {
    type: CART_ADD_ITEM_REQUEST,
  };
};

const cartAddItemSuccess = (cart: Cart): CartActions => {
  return {
    type: CART_ADD_ITEM_SUCCESS,
    payload: {
      cart,
    },
  };
};

const cartAddItemFailure = (error: string): CartActions => {
  return {
    type: CART_ADD_ITEM_FAILURE,
    error,
  };
};

export const addToCart = (
  productId: string,
  qty: number
): AsyncAction => async (dispatch: Dispatch, getState) => {
  try {
    dispatch(cartAddItemRequest());

    const { userLogin } = getState();

    if (!userLogin || !userLogin.authedUser) {
      throw new Error("401: Login to continue");
    }

    const { token } = userLogin.authedUser as User;

    const response: any = await fetch(`${baseUrl}/api/v1/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, qty }),
    });

    if (response.ok) {
      const cart = await response.json();

      dispatch(cartAddItemSuccess(cart));
    } else {
      throw new Error(`${response.status}: Could not fetch product`);
    }
  } catch (err) {
    dispatch(cartAddItemFailure(err.message));
  }
};

// CART REMOVE ITEM ACTION CREATORS
const cartRemoveItemRequest = (): CartActions => {
  return {
    type: CART_REMOVE_ITEM_REQUEST,
  };
};

const cartRemoveItemSuccess = (cart: Cart): CartActions => {
  return {
    type: CART_REMOVE_ITEM_SUCCESS,
    payload: {
      cart,
    },
  };
};

const cartRemoveItemFailure = (error: string): CartActions => {
  return {
    type: CART_REMOVE_ITEM_FAILURE,
    error,
  };
};

export const cartResetSuccess = (): CartActions => {
  return {
    type: CART_RESET_SUCCESS,
  };
};

export const removeFromCart = (productId: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(cartRemoveItemRequest());

    const { userLogin } = getState();

    if (!userLogin || !userLogin.authedUser) {
      throw new Error("401: Login to continue");
    }

    const { token } = userLogin.authedUser as User;

    const response: any = await fetch(`${baseUrl}/api/v1/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (response.ok) {
      const cart = await response.json();

      dispatch(cartRemoveItemSuccess(cart));
    } else {
      throw new Error(`${response.status}: Could not remove product`);
    }
  } catch (err) {
    dispatch(cartRemoveItemFailure(err.message));
  }
};
