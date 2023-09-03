import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';

const BookItem = ({ data, typeOfPage }) => {
    const {
        id,
        title,
        genre,
        pages,
        publisher,
        publication_date,
        price,
        reviews,
        description,
        reviewNumber,
        image_url,
    } = data;

    const dispatch = useDispatch();

    const handleAddToCart = (book) => {
        dispatch(addToCart(book));
    };

    return (
        <div className='book-list__item' key={id}>
            <Link
                to={`/books/${id}`}
                state={{ bookData: data }}
                key={id}
                className='book-list__item-image-container'>
                <img lazy src={image_url} alt={title} className='book-list__item-image' />
            </Link>
            <div className='book-list__item-details'>
                <h4 className='book-list__item-title'>{title}</h4>
                {typeOfPage !== 'cart' && <p className='book-list__item-info'>
                    <span className='book-list__item-label'>Genre:</span> {genre}
                </p>}
                {typeOfPage !== 'cart' && <p className='book-list__item-info'>
                    <span className='book-list__item-label'>Pages:</span> {pages}
                </p>}
                {typeOfPage !== 'cart' && <p className='book-list__item-info'>
                    <span className='book-list__item-label'>Publisher:</span> {publisher}
                </p>}
                {typeOfPage !== 'cart' && <p className='book-list__item-info'>
                    <span className='book-list__item-label'>Publication Date:</span> {publication_date}
                </p>}
                {typeOfPage !== 'cart' && <p className='book-list__item-info'>
                    <span className='book-list__item-label'>Average Review:</span> {reviewNumber.toFixed(1)}
                </p>}
                <p className='book-list__item-info'>
                    <span className='book-list__item-label'>Price:</span> ${price.toFixed(2)}
                </p>
                {typeOfPage !== 'cart' && <button className='btn add-to-cart-button' onClick={() => handleAddToCart(data)}>
                    Add to Cart
                </button>}
            </div>
        </div>
    );
};

export default BookItem;