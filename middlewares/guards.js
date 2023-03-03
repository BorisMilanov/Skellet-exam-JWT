function hasUser() {
    return (req,res,next) =>{ if (req.user) {
        next();
    } else {
        res.redirect('/auth/login') //guards wasnt okay
    }}
   
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