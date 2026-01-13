
import { verifyToken } from "../services/jwtService.js"; 

const authMiddleware = (req, res, next) => {
     
    //check if token is present 
    const token = req.cookies.token;
    if(!token)
        res.status(401).json({message:"NO token , authorization denied "})
    
    try {
    // Step 3: Verify token using jwtService
    const decoded = verifyToken(token);
    // Step 4: Attach decoded user info to request object
    req.user = decoded;
    // Proceed to next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid or expired
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;