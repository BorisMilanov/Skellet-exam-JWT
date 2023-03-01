function hasUser() {
    if (req.user) {
        next();
    } else {
        resizeBy.redirect('/auth/login')
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        }else{
            next();
        }
    }
}

module.exports = {
    hasUser,
    isGuest
}