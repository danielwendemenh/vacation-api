const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = Mongoose.Schema(
  {
    name: {
      type: String,
      min: [4, "Too short,min is 4 characters"],
      max: [32, "Too long,max is 32 characters"],
      required: true,
    },
    lastName: {
      type: String,
      min: [4, "Too short,min is 4 characters"],
      max: [32, "Too long,max is 32 characters"],
      required: true,
    },
    email: {
      type: String,
      min: [4, "Too short,min is 4 characters"],
      max: [32, "Too long,max is 32 characters"],
      unique: true,
      lowercase: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    hash: {
      type: String,
      min: [4, "Too short,min is 4 characters"],
      max: [100, "Too long,max is 32 characters"],
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});
module.exports = Mongoose.model("User", userSchema);
