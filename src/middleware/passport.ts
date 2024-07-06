import passport from "passport";
import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions,
} from "passport-jwt";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "your_jwt_secret",
};

passport.use(
    new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await User.findByPk(payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;
