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

/**
 * React component for displaying a list of books with filtering options.
 * @component
 */
const BooksList = () => {
    const dispatch = useDispatch();

    // Redux state selectors
    const booksListFromState = useSelector(booksState);
    const booksListLoadingFromState = useSelector(booksListLoadingState);
    const booksListErrorFromState = useSelector(booksListErrorState);

    // Component state
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filterTitle, setFilterTitle] = useState('');
    const [filterGenre, setFilterGenre] = useState('');
    const [filterRating, setFilterRating] = useState(0);
    const [filterPrice, setFilterPrice] = useState(0);

    /**
     * Fetches the list of books from the Redux store.
     * @memberof BooksList
     * @inner
     */
    useEffect(() => {
        dispatch(getBooksList());
    }, [dispatch]);

    /**
     * Filters the list of books based on search and filter criteria.
     * @param {Array} books - The list of books to be filtered.
     * @param {string} query - The search query for book titles.
     * @param {string} title - The filter criteria for book titles.
     * @param {string} genre - The filter criteria for book genres.
     * @param {number} rating - The filter criteria for book ratings.
     * @param {number} price - The filter criteria for book prices.
     * @returns {Array} The filtered list of books.
     * @memberof BooksList
     * @inner
     */
    const filterBooks = (books, query, title, genre, rating, price) => {
        return books.filter((book) => {
            const {
                title: bookTitle,
                genre: bookGenre,
                reviewNumber: bookRating,
                price: bookPrice,
            } = book;
            return (
                (query === '' || bookTitle.toLowerCase().includes(query.toLowerCase())) &&
                (title === '' || bookTitle.toLowerCase().includes(title.toLowerCase())) &&
                (genre === '' || bookGenre.toLowerCase().includes(genre.toLowerCase())) &&
                (rating === 0 || bookRating >= rating) &&
                (price === 0 || bookPrice <= price)
            );
        });
    };

    // Apply filters to the list of books
    const filteredBooks = filterBooks(
        booksListFromState,
        searchQuery,
        filterTitle,
        filterGenre,
        filterRating,
        filterPrice
    );

    /**
     * Toggles the display of filter options.
     * @memberof BooksList
     * @inner
     */
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className='book-list__wrapper'>
            <div className='book-list__header'>
                <h1 className='book-list__title'>Welcome to digital library</h1>
                <div className='book-list__filters'>
                    <button
                        className={`book-list__filter-button btn ${showFilters ? 'book-list__filter-button--opened' : ''}`}
                        onClick={toggleFilters}>
                        Filters
                    </button>
                    {showFilters && (
                        <div className='book-list__filter-form'>
                            <h3>Filter Books</h3>
                            <div className='form-group'>
                                <label>Title</label>
                                <input
                                    type='text'
                                    value={filterTitle}
                                    onChange={(e) => setFilterTitle(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Genre</label>
                                <input
                                    type='text'
                                    value={filterGenre}
                                    onChange={(e) => setFilterGenre(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Rating</label>
                                <input
                                    type='range'
                                    min='0'
                                    max='5'
                                    step='0.1'
                                    value={filterRating}
                                    onChange={(e) => setFilterRating(parseFloat(e.target.value))}
                                />
                                <span>{filterRating}</span>
                            </div>
                            <div className='form-group'>
                                <label>Price</label>
                                <input
                                    type='range'
                                    min='0'
                                    max='200'
                                    step='1'
                                    value={filterPrice}
                                    onChange={(e) => setFilterPrice(parseFloat(e.target.value))}
                                />
                                <span>${filterPrice}</span>
                            </div>
                        </div>
                    )}
                </div>
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
                        <div className='book-list__link' key={book.id}>
                            <BookItem data={book} typeOfPage={'booksList'} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No available books for that search and filters.</p>
            )}
        </div>
    );
};

export default BooksList;
