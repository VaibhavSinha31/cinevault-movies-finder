import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrending } from '../features/movies/moviesSlice';
import MovieGrid from '../components/MovieGrid';
import Loader from '../components/Loader';
export default function HomePage() { const dispatch = useDispatch(); const { trending, loading, error } = useSelector((state) => state.movies); useEffect(() => { dispatch(fetchTrending()); }, [dispatch]); return <section><div className="hero"><p className="eyebrow">CINEVAULT ORIGINALS</p><h1>Find your next<br/><span>movie night.</span></h1><p>Fresh stories, unforgettable characters, and a vault full of cinema waiting for you.</p></div><h2>Trending this week</h2>{loading ? <Loader/> : error ? <p className="message error">{error}</p> : <MovieGrid movies={trending}/>}</section>; }
