const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

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

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);
  if (isValidVin) {
    next();
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const vin = (req.body.vin)
  try {
    const vinExists = await Cars.getByVin(vin);
    if (vinExists) {
      return res.status(400).json({ message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ status: "500", err: err.message, location: 'middleware', middleware: 'checkVinNumber Unique' });
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
