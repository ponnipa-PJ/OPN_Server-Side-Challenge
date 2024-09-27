exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader === 'Bearer faketoken_user1') {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};