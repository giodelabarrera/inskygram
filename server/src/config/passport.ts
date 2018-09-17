import { config } from "dotenv";
import passport from "passport";
import PassportJwt, { ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { SignOptions } from "jsonwebtoken";
import logic from "../logic";
import PassportLocal from "passport-local";
import { UserModelInterface } from "../models/user";

config();

const { JWT_SECRET, JWT_EXP } = process.env;

const JwtStrategy = PassportJwt.Strategy;

const LocalStrategy = PassportLocal.Strategy;

passport.use(new LocalStrategy((username: string, password: string, done: any) => {
  logic.authenticate(username, password)
    .then(user => {
      if (!user) { return done(undefined, false); }

      done(undefined, user);
    })
    .catch(done);
}));

const jsonWebTokenOptions: SignOptions = { expiresIn: JWT_EXP };

const options: StrategyOptions = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jsonWebTokenOptions,
};

passport.use(new JwtStrategy(options, (payload: any, done: VerifiedCallback) => {
  const username = payload.sub;

  logic.retrieveUser(username)
    .then((user: UserModelInterface) => done(undefined, user ? user.username : false))
    .catch((err: Error) => done(err, false));
}));
