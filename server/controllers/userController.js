const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    const { username, password, email, isAdmin } = req.body;
    if (!username || !password || !email) {
        return res.status(400).send('Username, password, Email are required');
    }
    console.log(req.body)
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the user
        const user = new User({
            username,
            password: hashedPassword,
            email:email,
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
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {

        // Find the user by username
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');
        // Verify the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        // Generate a JWT
        const token = jwt.sign(
            { _id: user._id, },
            process.env.JWT_SECRET || 'SECRET_KEY',
            { expiresIn: '1h' }
        );

        res.header('Authorization', `Bearer ${token}`).send({ token , isAdmin: user.isAdmin,userData:user  });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Add learning data
const addLearning = async (req, res) => {
    const { learnings, _id } = req.body;
    console.log(req.body);

    // Destructure techLearnings, nonTechLearnings, remarks from the learnings object
    const { techLearnings, nonTechLearnings, remarks } = learnings;

    if (!techLearnings && !nonTechLearnings) {
        return res.status(400).send('At least one learning field is required');
    }
    console.log(techLearnings);
    

    try {
        // Find the user by ID
        const user = await User.findById(_id);
        if (!user) return res.status(404).send('User not found');

        if (user.isAdmin) {
            return res.status(403).send('Admins cannot add learnings');
        }

        // Add the current date to the learnings object
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in ISO format

        // Update learning fields if they are provided
        if (techLearnings) {
            // Assuming that techLearnings is a string (description), we directly set it
            user.learnings.techLearnings = techLearnings;
        }

        if (nonTechLearnings) {
            // Assuming that nonTechLearnings is a string (description), we directly set it
            user.learnings.nonTechLearnings = nonTechLearnings;
        }

        // Add remarks if provided
        if (remarks) {
            user.learnings.remarks = remarks;
        }

        // Add the current date
        user.learnings.dateAdded = currentDate;

        // Save the user with the updated learning fields
        await user.save();
        res.status(200).send('Learning added successfully');
    } catch (err) {
        console.error('Error adding learning:', err); // Log the error for debugging
        res.status(500).send('An error occurred while adding learning');
    }
};


const employees = async (req, res) => {
    try {
      // Find users who are not admins
      const users = await User.find({ isAdmin: false });
  
      if (!users) {
        return res.status(404).json({ message: "No non-admin users found" });
      }
  
      // Return the list of users
      return res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching non-admin users:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
const getUserById = async (req, res) => {
    const { id } = req.params; // Extract the user ID from the URL parameter
    
    try {
      // Find the user by their ID
      const user = await User.findById(id);
  
      // If user is not found, return a 404 error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return the user data in the response
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: "Server error" });
    }
};

const deleteUserById = async (req,res) => {
    const { id } = req.params; // Extract the user ID from the URL parameter

    try {
        // Attempt to find and delete the user
        const user = await User.findByIdAndDelete(id);
        console.log(user)
    } catch (error) {
        // Log and rethrow the error for the calling function
        console.error('Error in deleteUserById:', error.message);
        throw new Error(error.message || 'Database deletion failed');
    }
};

module.exports = { register, login, addLearning ,employees,getUserById,deleteUserById };
