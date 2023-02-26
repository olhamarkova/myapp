import express from 'express';
import uuidv4 from '../guid.js';
const router = express.Router();

router.use(uuidv4)

router.get('/', (req, res) => {
  res.json({
    reqId: req.uuidv4,
    message: "Hello world!",
  });
});

router.get('/up', (req, res) => {
  res.send({
    reqId: req.uuidv4,
  })
});

router.post('/', (req, res) => {
  res.json({
    reqId: req.uuidv4,
    message: "This is POST request"
  });
});

router.delete('/', (req, res) => {
  res.json({
    reqId: req.uuidv4,
    message: "This is DELETE request"
  });
});

export { router };