const router = require("express").Router();
const Cars = require("./cars-model");

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

router.get("/:id", async (req, res) => {
  try {
    const singleCar = await Cars.getById(req.params.id);
    if (singleCar) {
      console.log(singleCar);
      res.status(200).json(singleCar);
    } else {
      console.log(singleCar);
      res.status(404).json({ message: "error from else" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: "500", err });
  }

  // console.log("[GET] /:id inside car router");
  // res.send("b");
});

router.post("/", async (req, res) => {
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
