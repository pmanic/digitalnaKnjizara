import BooksList from '../components/booksList/booksList';

/**
 * React component for the home page.
 * @component
 */
const Home = () => {
    return <div className='page-layout home'>
        <BooksList />
    </div>
}

export default Home