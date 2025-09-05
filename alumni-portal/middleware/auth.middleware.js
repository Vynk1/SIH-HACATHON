const jwt = require("jsonwebtoken");

module.exports = function auth(requiredRoles = []) {
  return (req, res, next) => {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { _id, role, full_name }
      if (requiredRoles.length && !requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
