import React from 'react';
import { useLocation } from 'react-router-dom';

const BookDetails = () => {
  const location = useLocation();
  const { bookData } = location.state || {};

  if (!bookData) {
    // Handle the case where the book data is not found in state
    return <p>Book not found</p>;
  }

  return (
    <div className="book-details">
      <div className="book-details__image">
        <img src={bookData.image_url} alt={bookData.title} />
      </div>
      <div className="book-details__info">
        <h2>{bookData.title}</h2>
        <p>{bookData.description}</p>
        <p>Genre: {bookData.genre}</p>
        <p>Pages: {bookData.pages}</p>
        <p>Publisher: {bookData.publisher}</p>
        <p>Publication Date: {bookData.publication_date}</p>
        <p>Price: ${bookData.price.toFixed(2)}</p>
        <div>
          <h3>Reviews:</h3>
          <ul>
            {bookData.reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;