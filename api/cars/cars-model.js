const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = id => {
  return db('cars').where({carid: id})
  // DO YOUR MAGIC
}

const create = async newCar => {
  console.log('from model', newCar)
  const car = await db('cars').insert(newCar)
  return car;
}

module.exports = {
  getAll,
getById,
create
}