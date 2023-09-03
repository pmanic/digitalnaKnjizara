import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getBooksList,
    booksState,
    booksListLoadingState,
    booksListErrorState,
} from '../../redux/booksListSlice';
import Loader from '../shared/loader';
import Error from '../shared/error';
import BookItem from './bookItem';

const BooksList = () => {
    const dispatch = useDispatch();

    const booksListFromState = useSelector(booksState);
    const booksListLoadingFromState = useSelector(booksListLoadingState);
    const booksListErrorFromState = useSelector(booksListErrorState);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getBooksList());
    }, [dispatch]);

    const filterBooks = (books, query) => {
        return books.filter((book) => {
            const { title, genre, publisher } = book;
            return (
                title.toLowerCase().includes(query.toLowerCase()) ||
                genre.toLowerCase().includes(query.toLowerCase()) ||
                publisher.toLowerCase().includes(query.toLowerCase())
            );
        });
    };

    const filteredBooks = filterBooks(booksListFromState, searchQuery);

    return (
        <div className='book-list__wrapper'>
            <div className='book-list__header'>
                <h1 className='book-list__title'>Welcome to digital library</h1>
                <input
                    type='text'
                    className='book-list__search'
                    placeholder='Search by title, genre, or publisher'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {booksListLoadingFromState ? (
                <Loader text='Loading books...' />
            ) : booksListErrorFromState ? (
                <Error text='An error occurred while loading books list!' />
            ) : filteredBooks.length > 0 ? (
                <div className='book-list__content'>
                    {filteredBooks.map((book) => (
                        <div className='book-list__link'>
                            <BookItem data={book} typeOfPage={'booksList'} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No available books for that search.</p>
            )}
        </div>
    );
};

export default BooksList;