const Mongoose = require("mongoose");

const Schema = Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: [128, "Too long, max is 128 characters"],
    },
    city: { type: String, required: true, lowercase: true },
    street: {
      type: String,
      required: true,
      min: [4, "Too short, min is 4 characters"],
    },
    category: { type: String, required: true, lowercase: true },
    image: { type: String, required: true },
    bedrooms: Number,
    shared: Boolean,
    description: { type: String, required: true },
    dailyRate: Number,
    createdAt: { type: Date, default: Date.now },
    user: [{ type: Mongoose.Schema.Types.ObjectID, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = Mongoose.model("vacationsList", Schema);
