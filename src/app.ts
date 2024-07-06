import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import authorRoutes from "./routes/authorRoutes";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/users", userRoutes);

// Sync models with database
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Database connected!");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

const port = process.env.PORT || 3000;
