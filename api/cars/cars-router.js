const router = require("express").Router();
const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  // checkVinNumberValid,
  // checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", async (req, res) => {
  try {
    const cars = await Cars.getAll(); //! I forgot to invoke
    if (cars) {
      console.log("from inside [get]/", cars);
      res.status(200).json(cars);
    } else {
      res.status(404).json({ message: "error" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", checkCarId, async (req, res) => {
  res.status(200).json(req.car);
});

router.post("/", checkCarPayload, async (req, res) => {
  console.log(req.body);
  try {
    const newCar = await Cars.create(req.body);
    if (newCar) {
      console.log(newCar);
      res.status(200).json(newCar);
    } else {
      res.status(404).json({ message: "error" });
    }
  } catch (err) {
    res.status(500).json({ status: "500", err });
  }
});

module.exports = router;
