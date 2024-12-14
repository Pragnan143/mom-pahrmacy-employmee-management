const express = require('express');
const { register, login, addLearning,employees,getUserById, deleteUserById } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authentication');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-learnings', addLearning);
router.get('/:id',getUserById)
router.get("/", employees);
router.delete('/:id',deleteUserById)

module.exports = router;