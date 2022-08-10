const { Router } = require('express');
const Gemstone = require('../models/Gemstone');
// const authorizeGem = require('../middleware/authorizeGem');

module.exports = Router()
  .param('id', (req, res, next, id) => {
    req.id = id;
    next();
  })
  .post('/', async ({ body, user }, res, next) => {
    try {
      const gem = await Gemstone.insert({ ...body, user_id: user.id });
      res.json(gem);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async ({ user }, res, next) => {
    try {
      const gems = await Gemstone.getAll(user.id);
      res.json(gems);
    } catch (error) {
      next(error);
    }
  });
