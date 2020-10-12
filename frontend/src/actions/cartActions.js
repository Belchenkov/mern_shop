import axios from 'axios';

import {
    CART_REMOVE_ITEM,
    CART_ADD_ITEM
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const {
            data: {
                _id,
                name,
                image,
                price,
                countInStock
            }
        } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: _id,
                name,
                image,
                price,
                countInStock,
                qty
            }
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.log(error);
    }
};

export const removeFromCart = id => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};