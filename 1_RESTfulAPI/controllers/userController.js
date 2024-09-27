const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { email, password, name, dateOfBirth, gender, address, subscribe } = req.body;
    if (!email || !password || !name || !dateOfBirth || !gender || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.createUser(email, password, name, dateOfBirth, gender, address, subscribe);
    if (user) {
        res.status(201).json({ message: 'User registered successfully' });
    } else {
        res.status(400).json({ message: 'The email is already' });

    }
};

exports.getProfile = (req, res) => {
    const user = User.getUsers();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ ...user });
};

exports.getProfileById = (req, res) => {
    const id = Number(req.params.id);
    const user = User.getUserbyId(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

exports.updateProfile = (req, res) => {
    const id = Number(req.params.id);
    const user = User.updateUser(id, req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Profile updated successfully', user });
};

exports.deleteAccount = (req, res) => {
    const id = Number(req.params.id);
    if (User.deleteUser(id)) {
        return res.status(200).json({ message: 'Account deleted successfully' });
    }
    return res.status(404).json({ message: 'User not found' });
};

exports.changePassword = async (req, res) => {
    const id = Number(req.params.id);
    const result = await User.changePassword(id, req.body);
    return res.status(result.status).json({ message: result.message });
};