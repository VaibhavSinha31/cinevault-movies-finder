const usersKey = 'cinevault_demo_users';

export const getStoredUser = () => JSON.parse(localStorage.getItem('cinevault_user') || 'null');
export const isDemoSession = () => localStorage.getItem('cinevault_auth_mode') === 'demo';

export const createDemoAccount = ({ name, email, password }) => {
  const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) throw new Error('An account with this email already exists. Please log in instead.');
  const user = { id: `demo_${Date.now()}`, name: name.trim(), email: email.trim().toLowerCase(), password };
  users.push(user);
  localStorage.setItem(usersKey, JSON.stringify(users));
  return { id: user.id, name: user.name, email: user.email };
};

export const loginDemoAccount = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
  const user = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
  if (!user) throw new Error('No matching local account. Create an account first or check your password.');
  return { id: user.id, name: user.name, email: user.email };
};

const watchlistKey = () => `cinevault_watchlist_${getStoredUser()?.id || 'guest'}`;
export const getLocalWatchlist = () => JSON.parse(localStorage.getItem(watchlistKey()) || '[]');
export const saveLocalWatchlist = (movieIds) => localStorage.setItem(watchlistKey(), JSON.stringify(movieIds));
