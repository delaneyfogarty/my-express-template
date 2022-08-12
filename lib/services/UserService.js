const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// its my understanding that services provide specific parameters that don't necessarily need to be reused like things in a utils folder would be
module.exports = class UserService {
  static async create({ email, password }) {
    if (email.length <= 6) {
      throw new Error('Invalid email');
    }
    // if the email length is less than 6 characters, throw an 'invalid email' error

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    // if the password length is less than 6 characters, throw an 'invalid password' error

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    // setting a variable to hold onto a hashed password since the password will have to be hashed in all other files

    const user = await User.insert({
      email,
      passwordHash,
    });

    return user;
  }

  // making a variable to hold onto what a user is composed of - email & passwordHash

  static async signIn({ email, password = '' }) {
    try {
      const user = await User.getByEmail(email);
      // try getting the user by email
      if (!user) throw new Error('Invalid email');
      // if theres no user by that email, throw error
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password');
      // if theres no user with that password, throw error

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      // signing the user's payload and associated jwt with an expiration - the user will only be signed in for 1 day without having to re-log back in

      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
