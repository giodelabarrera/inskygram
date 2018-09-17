import cors from "cors";
import { config } from "dotenv";
import express from "express";
import "./config/passport";
import { defaultRouter, securityRouter, meRouter, userRouter, postRouter } from "./routes";
import { connect } from "./db";
import passport from "passport";

config();

const { DATABASE_URL, PORT } = process.env;

connect(DATABASE_URL)
  .then(db => {

    const app = express();

    app.use(cors());

    app.use(passport.initialize());

    app.use("/api", defaultRouter);
    app.use("/api", securityRouter);
    app.use("/api", meRouter);
    app.use("/api", userRouter);
    app.use("/api", postRouter);

    app.listen(PORT, () => console.log(`inskygram up and running on port ${PORT}`));
  });
