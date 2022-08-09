const Gemstone = require('../models/Gemstone');

module.exports = async (req, res, next) => {
  try {
    const gem = await Gemstone.getById(req.params.id);
    if (!gem || gem.user_id !== req.user.id) {
      throw new Error('You do not have access to view this page');
    }
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
