import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';

const imageUrl = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://placehold.co/500x750/1d1d1d/ffffff?text=No+Poster';

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const ids = useSelector((state) => state.favorites.ids);
  const saved = ids.includes(String(movie.id));

  const toggleWatchlist = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) return navigate('/login', { state: { from: { pathname: '/favorites' } } });
    return dispatch(saved ? removeFavorite(movie.id) : addFavorite(movie.id));
  };

  return <article className="movie-card"><Link to={`/movie/${movie.id}`}><div className="poster-wrap"><img src={imageUrl(movie.poster_path)} alt={movie.title}/><span className="rating-badge">IMDb {movie.vote_average?.toFixed(1) || 'N/A'}</span><button className={`watchlist-heart ${saved ? 'saved' : ''}`} onClick={toggleWatchlist} aria-label={saved ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}>{saved ? '♥' : '♡'}</button></div><div className="movie-info"><h3>{movie.title}</h3><p>{movie.release_date?.slice(0, 4) || 'TBA'} <span aria-hidden="true">&bull;</span> Movie</p></div></Link></article>;
}
