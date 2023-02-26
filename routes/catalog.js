import express from 'express';
import uuidv4 from '../guid.js';
const router = express.Router();

router.use(uuidv4);

router.get('/:id/section/:section', (req, res) => {
  let catalog = req.params.id;
  let section = req.params.section;
  res.json({
    reqId: req.uuidv4,
    catalog,
    section,
  });
});

export { router };