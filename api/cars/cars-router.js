const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("[GET] inside car router");
  res.send("a")
});
router.get("/:id", (req, res) => {
  console.log("[GET] /:id inside car router");
  res.send("b")
});
router.post("/", (req, res) => {
  console.log("[POST] inside car router");
  res.send("c")
});

module.exports = router;
