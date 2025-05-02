import {User} from "../model/user.js";
import jwt from "jsonwebtoken";
const verifyjwt =async (req, res, next) => {
  console.log("hello")
  try {
    const token = req.cookies.jwt;
    
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.secretKey);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Unauthorized: Token verification failed" });
  }
};
export default verifyjwt;
