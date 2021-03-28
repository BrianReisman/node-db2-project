const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where({ carid: id }).first();
};

const getByVin = async (vin) => {
  const carByVin = await db("cars").where({ vin }).first();
  return carByVin;
};

const create = async (newCar) => {
  const car = await db("cars").insert(newCar);
  return car;
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
};
