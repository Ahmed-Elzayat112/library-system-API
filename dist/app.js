"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const authorRoutes_1 = __importDefault(require("./routes/authorRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/authors", authorRoutes_1.default);
app.use("/books", bookRoutes_1.default);
app.use("/users", userRoutes_1.default);
// Sync models with database
database_1.default
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
