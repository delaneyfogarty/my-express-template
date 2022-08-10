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
  });

// making this comment for heroku deploy purposes
