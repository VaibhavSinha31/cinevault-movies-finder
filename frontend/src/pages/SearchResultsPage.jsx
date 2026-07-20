import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearch } from '../features/movies/moviesSlice';
import MovieGrid from '../components/MovieGrid';
import Loader from '../components/Loader';
export default function SearchResultsPage() { const [params] = useSearchParams(); const query = params.get('q') || ''; const dispatch = useDispatch(); const { search, loading } = useSelector((state) => state.movies); useEffect(() => { if (query) dispatch(fetchSearch({ query, page: 1 })); }, [dispatch, query]); return <section><h1>Search results for “{query}”</h1>{loading ? <Loader/> : search.results.length ? <MovieGrid movies={search.results}/> : <p className="message">No movies found. Try another title.</p>}</section>; }
