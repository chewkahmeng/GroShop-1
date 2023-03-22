const express = require('express');
var router = require("express").Router();
const tutorials = require("../controllers/tutorial.controller.js");

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

module.exports = router