const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      sameSite: "none",
    };

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    newUser.password = undefined;
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log("Source Error", err);
    next(err);
  }

  // log the user in
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email or password is missing!");

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Email or Password is incorrect");
    }

    // create and sign token

    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none": "lax",
      secure: process.env.NODE_ENV === "production"
    };

    res.cookie("jwt", token, cookieOptions);
    console.log(user);
    user.password = undefined;
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};



exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt", {httpOnly: true, sameSite: "none"})
    res.json({status: "success"})
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success", data: {user: req.user}
    })
  } catch (err) {
    next(err);
  }
};

