const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const passport = require("passport");
//* register the user (User Admin)
const UserRegister = async (userdata, role, res) => {
  //* validate the user
  let userNotEmailTaken = await validateUserEmail(userdata.email);
  if (!userNotEmailTaken) {
    return res.status(400).json({
      message: "Email is already taken",
      Success: false,
    });
  }
  const hash = await bcrypt.hash(userdata.password, 10);
  const newUser = new User({
    ...userdata,
    hash,
    role,
  });
  await newUser.save();
  return res.status(201).json({
    message: "Hurry! now you are successfully registered now log in",
    Success: true,
  });
};

const userLogin = async (usercreds, role, res) => {
  let { email, password } = usercreds;
  //check if user in database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "NO such user",
      Success: false,
    });
  }
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging from the right portal",
      Success: false,
    });
  }
  // That means user is existing and trying to log in

  // check for the password
  let ismatch = await bcrypt.compare(password, user.hash);

  if (ismatch) {
    //sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      SECRET,
      { expiresIn: "7 days" }
    );
    let result = {
      role: user.role,
      name: user.name,

      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res.status(200).json({
      ...result,
      message: "Hurry! now you are successfully logged  in",
      Success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password",
      Success: false,
    });
  }
};

const userAuth = passport.authenticate("jwt", { session: false });

const validateUserEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

module.exports = { userAuth, UserRegister, userLogin };
