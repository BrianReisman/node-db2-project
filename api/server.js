const express = require("express");
const server = require("express")();
const carsRouter = require("./cars/cars-router");

server.use(express.json());
server.use("/api/cars", carsRouter);

server.get("/", (req, res, next) => {
  console.log("inside server");
});

module.exports = server;
