const express = require('express');
const { register, login, addLearning,employees,getUserById } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authentication');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-learning', authenticateToken, addLearning);
router.get('/:id',getUserById)
router.get("/", employees);

module.exports = router;