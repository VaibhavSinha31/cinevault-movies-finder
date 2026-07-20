import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { createDemoAccount, loginDemoAccount } from '../../utils/localSession';
const savedUser = JSON.parse(localStorage.getItem('cinevault_user') || 'null');

const saveSession = ({ token, user, mode }) => {
  localStorage.setItem('cinevault_token', token);
  localStorage.setItem('cinevault_user', JSON.stringify(user));
  localStorage.setItem('cinevault_auth_mode', mode);
  return { token, user, mode };
};

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try { return saveSession({ ...(await apiClient.post('/auth/login', credentials)).data, mode: 'server' }); }
  catch (apiError) {
    try { return saveSession({ user: loginDemoAccount(credentials), token: `demo-token-${Date.now()}`, mode: 'demo' }); }
    catch (demoError) { return rejectWithValue(demoError.message || apiError || 'Unable to log in.'); }
  }
});
export const registerUser = createAsyncThunk('auth/register', async (details, { rejectWithValue }) => {
  try { return saveSession({ ...(await apiClient.post('/auth/register', details)).data, mode: 'server' }); }
  catch (apiError) {
    try { return saveSession({ user: createDemoAccount(details), token: `demo-token-${Date.now()}`, mode: 'demo' }); }
    catch (demoError) { return rejectWithValue(demoError.message || apiError || 'Unable to create an account.'); }
  }
});
const authSlice = createSlice({
  name: 'auth', initialState: { user: savedUser, loading: false, error: null },
  reducers: { logout: (state) => { state.user = null; localStorage.removeItem('cinevault_token'); localStorage.removeItem('cinevault_user'); localStorage.removeItem('cinevault_auth_mode'); }, clearAuthError: (state) => { state.error = null; } },
  extraReducers: (builder) => builder
    .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'), (state) => { state.loading = true; state.error = null; })
    .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/fulfilled'), (state, action) => { state.loading = false; state.user = action.payload.user; })
    .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'), (state, action) => { state.loading = false; state.error = action.payload || action.error.message || 'Unable to complete this request.'; })
});
export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
