const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoritesController');
router.use(protect);
router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:movieId', removeFavorite);
module.exports = router;
