import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).json({ error: 'Unauthorised' });
        } else {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
        }
        next();
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
