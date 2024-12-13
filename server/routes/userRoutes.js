const express = require('express');
const { register, login, addLearning } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authentication');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-learning', authenticateToken, addLearning);
router.get('/:userId/details')
module.exports = router;