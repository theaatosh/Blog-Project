
import jwt from "jsonwebtoken";
const verifyjwt = (req, res, next) => {
    const secretKey = process.env.secretKey;    
    const token=req.cookies.jwt
    // console.log(token);
    

    if (!token) {
    return res.status(403).json({message:"Access denied. No token provided."});
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({message:"Invalid Token"});;
    }
    req.user = decoded;
    next();
  });
};
export default verifyjwt;
