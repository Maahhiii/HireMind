const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware to protect routes - requires valid token
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

/**
 * Restrict route access to Candidates only
 */
const candidateOnly = (req, res, next) => {
  if (req.user && req.user.role === "candidate") {
    next();
  } else {
    return res.status(403).json({ message: "Access restricted to candidates" });
  }
};

/**
 * Restrict route access to Recruiters only
 */
const recruiterOnly = (req, res, next) => {
  if (req.user && req.user.role === "recruiter") {
    next();
  } else {
    return res.status(403).json({ message: "Access restricted to recruiters" });
  }
};

module.exports = { protect, candidateOnly, recruiterOnly };
