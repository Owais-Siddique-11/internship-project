const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied. You are not " + role });
    }
    next();
  };
};

module.exports = checkRole;
