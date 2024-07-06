import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Author } from "../models/author";
import { Book } from "../models/book";
import { User } from "../models/user";

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    logging: false,
});

sequelize.addModels([Author, Book, User]);

export default sequelize;
