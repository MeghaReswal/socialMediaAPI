const jwt = require("jsonwebtoken");
const User = require("../modal/user.model.js");
const bcrypt = require("bcrypt");
const { validateEmail } = require("../libs/validateCredential.js");

const userRegister = async (req, res) => {
  try {
    const { email, password, fullname } = req?.body;
    console.log("data", email, password, fullname);

    if (!email || !password || !fullname) {
      res
        .status(401)
        .json({ success: false, message: "please fill the all details" });
    }

    const emailError = validateEmail(email);
    if (emailError) {
      return res.status(401).json({ success: false, message: emailError });
    }

    let user = await User.findOne({ email: email });

    console.log("user12", user);

    if (user == null) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPW = bcrypt.hashSync(password, salt);

      user = new User({
        email,
        password: hashPW,
        fullname,
      });
      await user.save();

      res.status(200).json({
        success: true,
        message: "User registered successfully!",
      });
    } else {
      res.status(401).send({
        success: false,
        message: "you are already exist please login",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "something went wrong",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req?.body;
    console.log("datalogin", email, password);

    if (!email || !password) {
      res
        .status(401)
        .json({ success: false, message: "please fill the all details" });
    }

    const user = await User.findOne({ email });

    console.log("loginUser", user);

    if (!user) {
      return res.status(401).send({ message: "User Not found please signUp." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    console.log("passwordIsValid", passwordIsValid);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid fullname or password",
      });
    }

    const token = jwt.sign({ id: user.id }, "megha", { expiresIn: "7d" });

    res.status(200).send({
      token,
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "something went wrong",
      err,
    });
  }
};

module.exports = { userRegister, userLogin };
