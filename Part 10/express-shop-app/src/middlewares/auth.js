function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/products');
    }
    next();
}

function checkAdmin(req, res, next) {
    if (req.isAuthenticated() && res.locals.currentUser.admin === true) {
        next();
    } else {
        req.flash('error', 'You are not authorized to view this page');
        res.redirect('back');
    }
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    checkAdmin
}
