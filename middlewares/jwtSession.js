const { verifyToken } = require('../services/userServices')

module.exports = () => (req, res, next) => {
    const token = req.cookies.tokenSession;

    if (token) {
        console.log(token);
        try {
            const userDate = verifyToken(token);
            req.user = userDate
        } catch (err) {
            console.log(err);
            console.log('Invalid token');
            res.clearCookie('tokenSession');
            res.redirect('/auth/login');
            return;
        }

    }

    next();
}