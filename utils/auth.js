const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const layout = (req) => {
  if(req.session.logged_in) {
    return "dashboard"
  }
  return "main"
}

module.exports = { withAuth, layout };
