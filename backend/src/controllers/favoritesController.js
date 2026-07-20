const getFavorites = async (req, res) => res.json(req.user.favorites || []);

const addFavorite = async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ message: 'movieId is required.' });
  const id = String(movieId);
  if (!req.user.favorites.includes(id)) { req.user.favorites.push(id); await req.user.save(); }
  return res.status(201).json(req.user.favorites);
};

const removeFavorite = async (req, res) => {
  req.user.favorites = req.user.favorites.filter((id) => id !== String(req.params.movieId));
  await req.user.save();
  return res.json(req.user.favorites);
};
module.exports = { getFavorites, addFavorite, removeFavorite };
