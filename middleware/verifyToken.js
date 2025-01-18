import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
      req.userId = decode.userId;
    }
    next();
  } catch (error) {
    console.log("Error in verifyToken ", error);
    return res.status(401).json({ message: "Server error" });
  }
};
