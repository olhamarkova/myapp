import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config({ path: `.${process.env.NODE_ENV}.env`, override: true });
import { CoursesRouter } from "./modules/index.routers.js";
import { errorMessages } from "./services/error.mes.js";

const coursesRouter = new CoursesRouter();
const app = express();
const port = process.env.PORT;

async function start() {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_DB);
    if (connect) console.log("Connected!");
    app.listen(port, () => {
      console.log(`This server has been started on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}

mongoose.set("strictQuery", false);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/courses", coursesRouter.router);

app.use(function (req, res, next) {
  res.status(StatusCodes.BAD_REQUEST);
  res.json({ error: errorMessages.routeMessage });
  next();
});

new Promise((resolve, reject) => {
  resolve(start());
});
