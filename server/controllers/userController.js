const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    const { username, password, isAdmin } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the user
        const user = new User({
            username,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Log in a user
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User not found');

        // Verify the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        // Generate a JWT
        const token = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'SECRET_KEY',
            { expiresIn: '1h' }
        );

        res.header('Authorization', `Bearer ${token}`).send({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Add learning data
const addLearning = async (req, res) => {
    const { techLearnings, nonTechLearnings, remarks } = req.body;

    if (!techLearnings && !nonTechLearnings && !remarks) {
        return res.status(400).send('At least one learning field is required');
    }

    try {
        // Find the user by ID
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send('User not found');

        if (user.isAdmin) {
            return res.status(403).send('Admins cannot add learnings');
        }

        // Update learning fields
        if (techLearnings && Array.isArray(techLearnings)) {
            user.learnings.techLearnings.push(...techLearnings);
        }

        if (nonTechLearnings && Array.isArray(nonTechLearnings)) {
            user.learnings.nonTechLearnings.push(...nonTechLearnings);
        }

        if (remarks) {
            user.learnings.remarks = remarks;
        }

        await user.save();
        res.status(200).send('Learning added successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { register, login, addLearning };
