import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTrendingMovies, getMovieDetails, searchMovies } from '../../api/tmdbApi';
export const fetchTrending = createAsyncThunk('movies/trending', async () => (await getTrendingMovies()).data.results);
export const fetchMovie = createAsyncThunk('movies/details', async (id) => (await getMovieDetails(id)).data);
export const fetchSearch = createAsyncThunk('movies/search', async ({ query, page }) => (await searchMovies(query, page)).data);
const moviesSlice = createSlice({ name: 'movies', initialState: { trending: [], selected: null, search: { results: [], page: 1, totalPages: 0 }, loading: false, error: null }, reducers: { clearSelected: (state) => { state.selected = null; } }, extraReducers: (builder) => builder
  .addMatcher((action) => action.type.startsWith('movies/') && action.type.endsWith('/pending'), (state) => { state.loading = true; state.error = null; })
  .addMatcher((action) => action.type === 'movies/trending/fulfilled', (state, action) => { state.loading = false; state.trending = action.payload; })
  .addMatcher((action) => action.type === 'movies/details/fulfilled', (state, action) => { state.loading = false; state.selected = action.payload; })
  .addMatcher((action) => action.type === 'movies/search/fulfilled', (state, action) => { state.loading = false; state.search = { results: action.payload.results, page: action.payload.page, totalPages: action.payload.total_pages }; })
  .addMatcher((action) => action.type.startsWith('movies/') && action.type.endsWith('/rejected'), (state, action) => { state.loading = false; state.error = action.error.message; }) });
export const { clearSelected } = moviesSlice.actions;
export default moviesSlice.reducer;
