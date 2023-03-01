export default function uuidv4(req, res, next) {
  let guid = Date.now().toString(16) + Math.random().toString(16);
  req.uuidv4 = guid;
  next(); 
};

