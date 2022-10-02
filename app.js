// create an express app
import express from "express";
import { apiRouter } from "./apiMiddleware.js";
import { errorHandler } from "./errorHandler.js";
import BodyParser from "body-parser";

const app = express();
const jsonParser = BodyParser.json();
const urlencodedParser = BodyParser.urlencoded({ extended: false });

app.use(errorHandler);

app.use(jsonParser);
app.use(urlencodedParser);

// use the express-static middleware
app.use(express.static("public"))

app.use('/api', apiRouter)

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000,
	() => console.log("Server is running...\nGo to http://localhost:3000/"));
