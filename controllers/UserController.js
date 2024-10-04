const { compare } = require("../helper/bcrypt");
const { User } = require("../models");
const { generateToken } = require("../helper/Jwt");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

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
  let { email } = req.body;
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

    let access_token = generateToken({ id: user.id });
    res.status(200).json({ access_token });
  } catch (err) {
    next(err);
  }
};

exports.GoogleLogin = async (req, res, next) => {
  try {
    const { googleToken } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.G_CLIENT_ID,
      });
      const { username, email } = ticket.getPayload();
      console.log("User creation:", { username, email });

      let user = await User.findOne({ where: { email } });
      console.log(user?.toJSON(), "<<< user OAuth");

      if (!user) {
        const username = email.split("@")[0];
        user = await User.create(
          {
            username,
            email,
            password: "123456",
            role: "Admin",
          },
          {
            hooks: false,
          }
        );
      }
      const access_token = generateToken({ id: user.id });
      res.status(200).json({ access_token: access_token });
    } catch (err) {
      console.log(err, "<<< err googleLogin");
      next(err);
    }
  }
   