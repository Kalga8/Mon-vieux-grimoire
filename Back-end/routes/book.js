const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');

router.post('/', auth, bookCtrl.createBook); // Créer livre //
router.put('/:id', auth, bookCtrl.modifyBook); // Modifier livre //
router.delete('/:id', auth, bookCtrl.deleteOneBook); // Supprimer un livre //

module.exports = router;