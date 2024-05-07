import { useState } from 'react';

const initialState = {
    cart: [],
}


const useInitialState = () => {
    const [state, setState] = useState(initialState);

    const addToCart = (payload) => {
        setState({
            ...state,
            cart: [...state.cart, {...payload, quantity: 1}],
        });
    }

    const incrementItemCart = (payload) => {
        setState({
            ...state,
            cart: state.cart.map(
                (items) => 
                    items.id === payload.id
                    ? { ...items, quantity: items.quantity + 1 } 
                    : items
            ),
        });
    }

    const decrementItemCart = (payload) => {
        setState({
            ...state,
            cart: state.cart.map(
                (items) => 
                    items.id === payload.id && items.quantity > 1
                    ? { ...items, quantity: items.quantity - 1 } 
                    : items
            ),
        });
    }

    const removeFromCart = (payload) => {
        setState({
            ...state,
            cart: state.cart.filter(items => items.id !== payload.id),
        });
    };

    const itemExist = (payload) => {
        return state.cart.some(item => item.id === payload.id);
    }

    return {
        itemExist,
        addToCart,
        incrementItemCart,
        decrementItemCart,
        removeFromCart,
        state,
    };
}
export default useInitialState;