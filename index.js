const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000/login"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("Server running on port 3002");
  });
});