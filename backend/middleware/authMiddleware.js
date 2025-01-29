import  jwt  from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Token required, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    }; 
};