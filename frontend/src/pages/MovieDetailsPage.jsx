import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovie } from '../features/movies/moviesSlice';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import Loader from '../components/Loader';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: movie, loading } = useSelector((state) => state.movies);
  const { user } = useSelector((state) => state.auth);
  const ids = useSelector((state) => state.favorites.ids);
  useEffect(() => { dispatch(fetchMovie(id)); }, [dispatch, id]);
  if (loading || !movie) return <Loader/>;
  const saved = ids.includes(String(movie.id));
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750/1d1d1d/ffffff?text=No+Poster';

  return <article className="details"><img src={poster} alt={movie.title}/><div><p className="eyebrow">{movie.release_date?.slice(0, 4)} <span aria-hidden="true">&bull;</span> IMDb {movie.vote_average?.toFixed(1)}</p><h1>{movie.title}</h1><p className="genres">{movie.genres?.map((genre) => genre.name).join(' • ')}</p><p>{movie.overview || 'No overview available for this title.'}</p>{user ? <button className="primary-btn" onClick={() => dispatch(saved ? removeFavorite(movie.id) : addFavorite(movie.id))}>{saved ? '♥ Saved to watchlist' : '♡ Add to watchlist'}</button> : <Link className="primary-btn sign-in-btn" to="/login">Sign in to add to watchlist</Link>}</div></article>;
}
