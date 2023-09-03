import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

import staticValues from '../assets/staticValues';

/**
 * Redux slice for managing book list state.
 */
export const booksListSlice = createSlice({
    name: "booksList",
    initialState: {
        booksListLoading: false,
        books: [],
        booksListError: false
    },
    reducers: {
        setBooksListLoading: (state) => {
            state.booksListLoading = true;
            state.booksListError = false;
        },
        unsetBooksListLoading: (state) => {
            state.booksListLoading = false;
        },
        setBooksList: (state, action) => {
            state.books = action.payload;
        },
        setBooksListError: (state) => {
            state.booksListLoading = false;
            state.booksListError = true;
        }
    }
});

/**
 * Retrieves a list of books from an API and dispatches actions to update the state.
 * @async
 * @param {function} dispatch - The Redux dispatch function.
 */
export const getBooksList = () => async (dispatch) => {
    try {
        dispatch(setBooksListLoading());
        const response = await axios.get(`${staticValues.baseURL.dev}`);
        dispatch(setBooksList(response.data));
        dispatch(unsetBooksListLoading());
    } catch (err) {
        dispatch(setBooksListError());
    }
};

export const {
    setBooksListLoading,
    unsetBooksListLoading,
    setBooksList,
    setBooksListError
} = booksListSlice.actions;

/**
 * Selectors
 */
export const booksListLoadingState = (state) => state.booksList.booksListLoading;
export const booksState = (state) => state.booksList.books;
export const booksListErrorState = (state) => state.booksList.booksListError;
export default booksListSlice.reducer;