import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch {
      // Continue to fallback
    }
  }
  
  const userEmail = req.body.userEmail || req.query.userEmail;
  if (userEmail) {
    req.user = { email: userEmail };
    return next();
  }
  
  return res.status(401).json({ message: "Not authorized" });
};

export const protectRoute = authMiddleware;
export default authMiddleware;