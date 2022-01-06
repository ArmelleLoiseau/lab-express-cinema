const express = require("express");
const router = express.Router();
const Movies = require("../models/Movie.model");
const mongoose = require("mongoose");

/* GET movies page */
// prefixed /movies

router.get("/", (req, res, next) => {
  Movies.find()
    .then((dbResponse) => {
      console.log("db response is", dbResponse);
      res.render("movies.hbs", {
        movies: dbResponse,
      });
    })
    .catch((e) => console.error(e));
});

router.get("/:id", (req, res, next) => {
  console.log(req.params);
  const isValidId = mongoose.isValidObjectId(req.params.id);
  if (isValidId) {
    Movies.findById(req.params.id)
      .then((movie) => {
        res.render("onemovie.hbs", {
          movie,
          css: ["stylesheets/onemoviestyle.css"],
        });
      })
      .catch((e) => console.error(e));
  }
});

module.exports = router;
