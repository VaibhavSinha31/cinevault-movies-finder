import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { getLocalWatchlist, isDemoSession, saveLocalWatchlist } from '../../utils/localSession';
const localAdd = (movieId) => { const ids = getLocalWatchlist(); const updated = ids.includes(String(movieId)) ? ids : [...ids, String(movieId)]; saveLocalWatchlist(updated); return updated; };
const localRemove = (movieId) => { const updated = getLocalWatchlist().filter((id) => id !== String(movieId)); saveLocalWatchlist(updated); return updated; };
export const fetchFavorites = createAsyncThunk('favorites/fetch', async () => { if (isDemoSession()) return getLocalWatchlist(); try { return (await apiClient.get('/favorites')).data; } catch { return getLocalWatchlist(); } });
export const addFavorite = createAsyncThunk('favorites/add', async (movieId) => { if (isDemoSession()) return localAdd(movieId); try { return (await apiClient.post('/favorites', { movieId })).data; } catch { return localAdd(movieId); } });
export const removeFavorite = createAsyncThunk('favorites/remove', async (movieId) => { if (isDemoSession()) return { movieId, favorites: localRemove(movieId) }; try { return { movieId, favorites: (await apiClient.delete(`/favorites/${movieId}`)).data }; } catch { return { movieId, favorites: localRemove(movieId) }; } });
const favoritesSlice = createSlice({ name: 'favorites', initialState: { ids: [], loading: false }, reducers: { clearFavorites: (state) => { state.ids = []; } }, extraReducers: (builder) => builder
  .addCase(fetchFavorites.fulfilled, (state, action) => { state.ids = action.payload; state.loading = false; })
  .addCase(addFavorite.fulfilled, (state, action) => { state.ids = action.payload; })
  .addCase(removeFavorite.fulfilled, (state, action) => { state.ids = action.payload.favorites; })
  .addMatcher((action) => action.type.startsWith('favorites/') && action.type.endsWith('/pending'), (state) => { state.loading = true; })
  .addMatcher((action) => action.type.startsWith('favorites/') && action.type.endsWith('/rejected'), (state) => { state.loading = false; }) });
export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
