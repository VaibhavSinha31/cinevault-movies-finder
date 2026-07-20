import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesByIds } from '../api/tmdbApi';
import { fetchFavorites } from '../features/favorites/favoritesSlice';
import MovieGrid from '../components/MovieGrid';
import Loader from '../components/Loader';

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const { ids } = useSelector((state) => state.favorites);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { dispatch(fetchFavorites()); }, [dispatch]);
  useEffect(() => {
    const load = async () => { setLoading(true); try { const responses = await getMoviesByIds(ids); setMovies(responses.map((response) => response.data)); } catch { setMovies([]); } finally { setLoading(false); } };
    load();
  }, [ids]);
  return <section className="watchlist-page"><p className="eyebrow">YOUR PERSONAL QUEUE</p><h1>My Watchlist</h1><p className="section-copy">Click the heart on any movie to keep it ready for your next watch.</p>{loading ? <Loader/> : movies.length ? <MovieGrid movies={movies}/> : <p className="message">Your watchlist is empty. Browse the home page and tap a heart to save something for later.</p>}</section>;
}
