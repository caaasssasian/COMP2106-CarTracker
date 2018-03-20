// global functions

// auth chceck method
module.exports = {
    isLoggedIn : (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    else {
      res.redirect('/login');
    }
}
};