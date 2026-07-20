import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { clearFavorites } from '../features/favorites/favoritesSlice';
import SearchBar from './SearchBar';
export default function Navbar() {
  const { user } = useSelector((state) => state.auth); const dispatch = useDispatch(); const navigate = useNavigate();
  const signOut = () => { dispatch(logout()); dispatch(clearFavorites()); navigate('/'); };
  return <header className="navbar"><Link className="brand" to="/"><span>Cine</span>Vault</Link><SearchBar/><nav><NavLink to="/">Home</NavLink>{user ? <><NavLink to="/favorites">Watchlist</NavLink><button className="link-button" onClick={signOut}>Logout</button></> : <><NavLink to="/login">Login</NavLink><NavLink className="join" to="/register">Join</NavLink></>}</nav></header>;
}
