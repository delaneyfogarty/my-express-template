const { Router } = require('express');
const Gemstone = require('../models/Gemstone');
const authorizeGem = require('../middleware/authorizeGem');

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
  })
  .get('/:id', authorizeGem, async ({ id }, res, next) => {
    try {
      const singleGem = await Gemstone.getById(id);
      res.json(singleGem);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', authorizeGem, async ({ id, user, body }, res, next) => {
    try {
      const updatedGem = await Gemstone.updateById(id, user.id, body);
      res.json(updatedGem);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', authorizeGem, async ({ id }, res, next) => {
    try {
      const deletedGem = await Gemstone.delete(id);
      res.json(deletedGem);
    } catch (error) {
      next(error);
    }
  });
