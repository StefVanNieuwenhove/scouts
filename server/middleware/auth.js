const auth = (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  next();
};

module.exports = auth;
