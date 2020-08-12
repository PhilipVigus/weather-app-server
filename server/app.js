import express from "express";
import cors from "cors";
import logger from "morgan";
import citiesRouter from "./routes/cities";

const app = express();

app.use(logger("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/cities", citiesRouter);

export default app;
