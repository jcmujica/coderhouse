export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('No autorizado');
};