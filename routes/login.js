import express from 'express';
import uuidv4 from '../guid.js';
const router = express.Router();

router.use(uuidv4);

router.post('/', (req,res) => {
  const users = [
    {login: 'mike', password: '123sd456'},
    {login: 'kuku', password: '133sd456'},
    {login: 'kaka', password: '12dddsd456'}];
  const user = users.find(el => {
    return el.login === req.body.login && el.password === req.body.password
  });
  if(user) return res.json({
    reqId: req.uuidv4,
    message: 'logined'});
    res.status(401).json({ 
      reqId: req.uuidv4,
      message: 'Incorrect login or password' });  
});

export { router };