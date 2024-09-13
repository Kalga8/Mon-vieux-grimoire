const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book');

router.post('/', auth, multer, bookCtrl.createBook); // Créer livre //
router.get('/', bookCtrl.getAllBooks); // Rechercher tous les livres //
router.get('/bestrating', bookCtrl.bestrating); // Obtenir les meilleurs livres //
router.put('/:id', auth, multer, bookCtrl.modifyBook); // Modifier livre //
router.delete('/:id', auth, bookCtrl.deleteBook); // Supprimer un livre //
router.post('/:id/rating', auth, bookCtrl.ratingBook); // Notation d'un livre //
router.get('/:id', bookCtrl.getOneBook); // Rechercher un livre //

module.exports = router;