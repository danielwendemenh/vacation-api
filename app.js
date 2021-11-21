const express = require("express");
const app = express();
const morgan = require("morgan");
const { PORT } = require("./config");
const vacationsRoutes = require("./routes/vacationsRoutes");
const userRoutes = require("./routes/userRoutes");
const passport = require("passport");
const cors = require("cors");

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
require("./middlewares/passport.js")(passport);
app.use("/vacations", vacationsRoutes);
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.json({ success: true });
});
app.listen(PORT, () => {
  console.log("listening on port " + PORT, "concocted to db");
});
