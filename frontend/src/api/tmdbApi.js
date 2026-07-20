import axios from 'axios';
import { demoMovies, findDemoMovie } from './demoMovies';
const tmdb = axios.create({ baseURL: 'https://api.themoviedb.org/3' });
const params = { api_key: import.meta.env.VITE_TMDB_API_KEY };
const demoResponse = (data) => Promise.resolve({ data });
const useDemo = !params.api_key || params.api_key === 'your_tmdb_key';
const withDemoFallback = (request, fallback) => useDemo ? demoResponse(fallback()) : request().catch(() => demoResponse(fallback()));

export const getTrendingMovies = () => withDemoFallback(() => tmdb.get('/trending/movie/week', { params }), () => ({ results: demoMovies }));
export const getMovieDetails = (id) => withDemoFallback(() => tmdb.get(`/movie/${id}`, { params: { ...params, append_to_response: 'credits' } }), () => findDemoMovie(id) || demoMovies[0]);
export const searchMovies = (query, page = 1) => withDemoFallback(() => tmdb.get('/search/movie', { params: { ...params, query, page } }), () => ({ results: demoMovies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())), page, total_pages: 1 }));
export const getMoviesByIds = (ids) => Promise.all(ids.map((id) => getMovieDetails(id)));
