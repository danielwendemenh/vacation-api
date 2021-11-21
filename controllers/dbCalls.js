const Vacations = require("../models/vacations");

exports.addVacation = (req, res) => {
  const newVacation = new Vacations({
    title: req.body.title,
    city: req.body.city,
    street: req.body.street,
    category: req.body.category,
    image: req.body.image,
    bedrooms: req.body.bedrooms,
    shared: req.body.shared,
    description: req.body.description,
    dailyRate: req.body.dailyRate,
  });
  newVacation
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllVacations = (req, res) => {
  Vacations.find()
    .limit(12)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).send({
        errors: [
          { errpr: err },
          { title: "vacations error!", detail: "could not find vacation" },
        ],
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Vacations.findByIdAndDelete(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.update = (req, res) => {
  const {
    id,
    title,
    city,
    street,
    category,
    image,
    bedrooms,
    shared,
    description,
    dailyRate,
  } = req.body;
  Vacations.findByIdAndUpdate(
    id,
    {
      title,
      dailyRate,
      city,
      street,
      category,
      image,
      bedrooms,
      shared,
      description,
    },
    { new: true },
    (error, data) => {
      if (error) res.json({ msg: "failed update" }).status(502);
      res.send(data);
    }
  );
};

exports.getOne = (req, res) => {
  const id = req.params.id;

  Vacations.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).send({
        errors: [
          { errpr: err },
          { title: "vacations error!", detail: "could not find vacation" },
        ],
      });
    });
};
exports.searchByCity = (req, res) => {
  const city = req.body.city;
  console.log(city);
  Vacations.find(city)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(402).send({
        errors: [{ msg: "here" }],
      });
    });
};
