// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("./config");

// ℹ️ Connects to the database
require("./db/index.js");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();
app.set("view engine", "hbs");

// set partials and static
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "lab-express-cinema";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);
const movies = require("./routes/movies.route");
app.use("/movies", movies);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
