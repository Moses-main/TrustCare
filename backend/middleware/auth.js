// // // backend/middleware/auth.js
// // import jwt from "jsonwebtoken";

// // const authMiddleware = (req, res, next) => {
// //   const authHeader = req.headers.authorization;

// //   // Check if the Authorization header exists and starts with "Bearer"
// //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //     return res.status(401).json({ message: "Unauthorized: No token provided" });
// //   }

// //   const token = authHeader.split(" ")[1];

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded; // Attach decoded user info to the request
// //     next(); // Proceed to the next middleware/route handler
// //   } catch (err) {
// //     return res.status(401).json({ message: "Unauthorized: Invalid token" });
// //   }
// // };

// // export default authMiddleware;

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) return res.status(401).json({ message: "Not authorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token failed" });
//   }
// };

// export default protect;

// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = {
      id: user._id,
      walletAddress: user.walletAddress,
      role: user.role,
      email: user.email,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
