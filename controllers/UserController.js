const { compare } = require("../helper/bcrypt");
const { User } = require("../models");
const { generateToken } = require("../helper/Jwt");

exports.register = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    await User.create({ email, password });
    res.status(201).json({ message: "your data has been created" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    if (!email) {
      throw {
        name: "Bad Request",
        message: "Please input your email correctly",
      };
    }
    if (!password) {
      throw {
        name: "Bad Request",
        message: "Please input your password correctly",
      };
    }
    let user = await User.findOne({
      where: {
        email
      }
    });

    if (!user || !compare(password, user.password)) {
      throw { name: "Unauthorized", message: "Email or Password wrong" };
    }

    let access_token = generateToken(user);
    res.status(200).json({ access_token });
  } catch (err) {
    next(err);
  }
};
