import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartItemsState, removeFromCart } from '../redux/cartSlice';
import BookItem from '../components/booksList/bookItem';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(cartItemsState);

    const removeItemFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div className="cart__wrapper">
            <div className="cart__header">
                <h1 className="cart__title">Your Cart</h1>
                <p className="cart__title">Total: ${calculateTotalPrice().toFixed(2)}</p>
            </div>
            {cartItems.length > 0 ? (
                <div className="cart__content">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart__link">
                            <BookItem data={item} typeOfPage={'cart'} />
                            <button className='btn btn--inverse' onClick={() => removeItemFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No books currently in cart.</p>
            )}
        </div>
    );
};

export default Cart;
