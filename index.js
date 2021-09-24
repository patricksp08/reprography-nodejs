const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Models
const db = require("./models");
const Role = db.role;

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

<<<<<<< HEAD
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
=======
>>>>>>> 7cd3467302024fe587e2226f0b3bdd214d78ccc5
