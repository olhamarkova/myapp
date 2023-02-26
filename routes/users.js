import express from 'express';
import uuidv4 from '../guid.js';
import requestTime from '../middleware.js';
import { UserModel } from '../index.js';

const router = express.Router();

router.use(uuidv4);
router.use(requestTime);

router.get('/', (req,res) => {
  res.json({
    reqId: req.uuidv4,
    message: "Get all users",
    time: req.requestTime,
  });
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) throw new Error("Need to provide all required fields.");
    const user = await UserModel.create({ 
      name,
      email,
      phone,
    });
    res.status(201).json({
      reqId: req.uuidv4,
      message: "User is created",
      data: { user },
      time: req.requestTime,
    });
  } catch(err) {
    res.status(404).json({
      reqId: req.uuidv4,
      message: err.message,
      data: null,
      time: req.requestTime,
    });
  }
});

router.get('/:id', async (req, res, next) => {
		try {
      const id = req.params.id;
      if (!id) throw new Error("id is null");
			const user = await UserModel.findById(id);
      res.status(200).json({
        message: 'Get User by ID',
        content: {
          user,
        }
      });
		} catch (err) {
			res.status(404).json({
        message: err.message,
        content: null
      });
		}
});

router.put('/:id', (req, res) => {
  let message = `Update User ID: ${req.params.id}`
  res.json({
    reqId: req.uuidv4,
    message,
    time: req.requestTime,
  });
});

router.delete('/:id', (req, res) => {
  let message = `Delete User ID: ${req.params.id}`
  res.json({
    reqId: req.uuidv4,
    message,
    time: req.requestTime,
  });
});

export { router };


//create auth token