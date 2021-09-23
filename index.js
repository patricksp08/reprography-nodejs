const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = require("./models");

// Routers
const usersRouter = require("./routes/usuario-routes");
app.use("/usuario", usersRouter);

const pedidosRouter = require("./routes/pedido-routes");
app.use("/pedido", pedidosRouter );

const resetRouter = require("./routes/resettoken-routes")
app.use("/reset", resetRouter);

db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("/////////////---Server running on port 3002---/////////////");
  });
});

