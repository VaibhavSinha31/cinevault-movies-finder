import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchResultsPage from './pages/SearchResultsPage';
import { fetchFavorites } from './features/favorites/favoritesSlice';
function App() {
  const dispatch = useDispatch(); const user = useSelector((state) => state.auth.user); const location = useLocation();
  useEffect(() => { if (user) dispatch(fetchFavorites()); }, [dispatch, user, location.pathname]);
  return <><Navbar/><main className="container"><Routes><Route path="/" element={<HomePage/>}/><Route path="/login" element={<LoginPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/movie/:id" element={<MovieDetailsPage/>}/><Route path="/search" element={<SearchResultsPage/>}/><Route path="/favorites" element={<ProtectedRoute><FavoritesPage/></ProtectedRoute>}/></Routes></main></>;
}
export default App;
