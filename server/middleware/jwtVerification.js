
import jwt from "jsonwebtoken";
const verifyjwt = (req, res, next) => {
    const secretKey = process.env.secretKey;
    const token=req.cookies.token

    
  
    
  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Invalid token.");
    }
    req.user = decoded;
    next();
  });
};
export default verifyjwt;
