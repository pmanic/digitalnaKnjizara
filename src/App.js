import { Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation/navigation';
import Home from './pages/home';
import Cart from './pages/cart';
import BookDetails from './pages/bookDetails';

const App = () => {

  return <div className="app-layout">
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/books/:bookId" element={<BookDetails />} />
    </Routes>
  </div>
}

export default App;
