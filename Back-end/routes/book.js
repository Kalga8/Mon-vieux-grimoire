const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');
const multer = require('../middleware//multer-config');

router.post('/', auth, multer, bookCtrl.createBook); // Créer livre //
router.put('/:id', auth, multer, bookCtrl.modifyBook); // Modifier livre //
router.delete('/:id', auth, bookCtrl.deleteBook); // Supprimer un livre //

module.exports = router;