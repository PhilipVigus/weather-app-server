import express from "express";
import cors from "cors";
import locationsRouter from "./routes/locations";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/locations", locationsRouter);

export default app;
