const pool = require('../utils/pool');

module.exports = class Gemstone {
  id;
  description;
  is_beautiful;
  qty;
  user_id;

  constructor({ id, description, is_beautiful, qty, user_id }) {
    this.id = id;
    this.description = description;
    this.is_beautiful = is_beautiful;
    this.qty = qty;
    this.user_id = user_id;
  }

  static async insert({ description, qty, user_id }) {
    const { rows } = await pool.query(
      `
      INSERT INTO gemstones (description, qty, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [description, qty, user_id]
    );

    return new Gemstone(rows[0]);
  }
};