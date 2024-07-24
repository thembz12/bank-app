const jwt = require("jsonwebtoken");
const transactionModel = require("../model/depositModel.js");
const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const sendMail = require("../helpers/email.js");
const html = require("../helpers/html.js");

exports.signUp = async (req, res) => {
  try {
    const {
      fullname,
      email,
      address,
      dob,
      gender,
      phoneNumber,
      pin,
      methodOfSavings,
      password,
    } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "user already exist" });
    } else {
      const saltedpassword = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, saltedpassword);
      const user = new userModel({
        fullname,
        email,
        address,
        dob,
        gender,
        phoneNumber,
        methodOfSavings,
        password: hashedpassword,
        pin,
      });

    
        
      await user.save();
      res.status(201).json({
        message: "successful",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length <= 0) {
      return res.status(400).json({
        message: "no available registered users",
      });
    } else {
      res.status(200).json({
        message: "all resgistered users",
        totalUsersRegistered: users.length,
        data: users,
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email: email.toLowerCase() });
    if (!userExist) {
      return res.status(400).json({ message: "user not found" });
    }

    const confirmPassowrd = await bcrypt.compare(password, userExist.password);
    if (!confirmPassowrd) {
      return res.status(400).json({ message: "incorrect password" });
    }
    const token = await jwt.sign(
      {
        userId: userExist._id,
        email: userExist.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ message: "login successful", data: userExist, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    let { id } = req.params.id;
    const user = await userModel.findOne({ id });
    if (!user) {
      return res.status(400).json({
        message: "wrong user ID",
      });
    } else {
      res.status(200).json({
        message: `kindly find user with ${id}`,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json(error.meesage);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      res.status(404).json({ message: "user not found" });
    }
    const resetToken = jwt.sign(
      { email: userExist.email },
      process.env.JWT_SECRET,
      { expiresIn: "20mins" }
    );

    const resetLink = `${req.protocol}://${req.get("host")}/router/verify/${
      userExist._id
    }/${resetToken}`;

    let mailOptions = {
      email: userExist.email,
      subject: "verification email",
      html: html.forgetPasswordTemplate(resetLink, userExist.fullname),
    };

    await userExist.save();
    await sendMail(mailOptions);

    res.status(200).json({ message: "reset link sent to email" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      res.status(400).json({ message: "invalid reset token" });
    }
    const saltedPassword = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, saltedPassword);

    userExist.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "password reset successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.logOut = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "invalid token",
      });
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.blackList.push(token);

    await user.save();

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
