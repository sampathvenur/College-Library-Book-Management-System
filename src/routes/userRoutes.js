const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id/books', userController.getUserBooks);
router.post('/:id/requestBook/:bookId', userController.requestBook);

module.exports = router;