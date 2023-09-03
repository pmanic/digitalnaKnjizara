import { configureStore } from "@reduxjs/toolkit";
import { booksListSlice } from "./booksListSlice";
import { cartSlice } from "./cartSlice";

export default configureStore({
    reducer: {
        booksList: booksListSlice.reducer,
        cart: cartSlice.reducer
    }
});
