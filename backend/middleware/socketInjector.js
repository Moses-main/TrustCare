// middleware/socketInjector.js
export default (io) => (req, res, next) => {
    req.io = io;
    next();
  };
  