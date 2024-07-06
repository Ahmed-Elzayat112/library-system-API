import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config();
console.log(join(__dirname, "..", "models.*.{ts,js}"));

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    logging: false,
    models: [join(__dirname, "..", "models", "*.{ts,js}")],
});

// sequelize.addModels([Author, Book, User]);

export default sequelize;
