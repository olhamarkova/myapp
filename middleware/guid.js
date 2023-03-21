export default function uuidv4(req, res, next) {
  req.uuidv4 = Date.now().toString(16) + Math.random().toString(16);
  next(); 
};

