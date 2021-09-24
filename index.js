const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");

// var corsOptions = {
//   origin: "http://localhost:3000"
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

//Usuario router
require("./routes/usuario-routes")(app)
//Pedido router
require("./routes/pedido-routes")(app)
//Deatlhes do Pedido router
require("./routes/det_pedido-routes")(app)
//Auth Router
require('./routes/auth-routes')(app)

const resetRouter = require("./controllers/resettoken-controller")
app.use(resetRouter);


db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("/////////////---Server running on port 3002---/////////////");
    // initial();
  });
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }
