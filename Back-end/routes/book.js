const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware//multer-config');
const bookCtrl = require('../controllers/book');

router.post('/', auth, multer, bookCtrl.createBook); // Créer livre //
router.put('/:id', auth, multer, bookCtrl.modifyBook); // Modifier livre //
router.delete('/:id', auth, bookCtrl.deleteBook); // Supprimer un livre //
router.get('/:id', bookCtrl.getOneBook); // Rechercher un livre //
router.get('/', bookCtrl.getAllBooks); // Rechercher tous les livres //

module.exports = router;