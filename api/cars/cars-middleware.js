const Cars = require("./cars-model");

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id); //! I forgot to invoke
    if (car) {
      req.car = car;
      next();
    } else {
      res
        .status(404)
        .json({ message: `car with id ${req.params.id} is not found` });
    }
  } catch (err) {
    res.status(500).json({ status: "500", err });
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    res.status(400).json({ message: `vin is missing` });
  } else if (!make) {
    res.status(400).json({ message: `make is missing` });
  } else if (!model) {
    res.status(400).json({ message: `model is missing` });
  } else if (!mileage) {
    res.status(400).json({ message: `mileage is missing` });
  } else {
    next();
  }
};

// const checkVinNumberValid = (req, res, next) => {
// //   - `checkVinNumberValid` returns a status 400 with a `{ message: "vin <vin number> is invalid" }` if the vin number is [invalid](https://www.npmjs.com/package/vin-validator).
// }

// const checkVinNumberUnique = (req, res, next) => {
// //   - `checkVinNumberUnique` returns a status 400 with a `{ message: "vin <vin number> already exists" }` if the vin number already exists in the database.
// }

module.exports = {
  checkCarId,
  checkCarPayload,
  // checkVinNumberValid,
  // checkVinNumberUnique
};
