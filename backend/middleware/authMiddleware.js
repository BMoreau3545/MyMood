import  jwt  from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers('authorization');
    if (!token) {
        return res.status(401).json({ message: 'token required, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}