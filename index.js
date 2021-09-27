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

const { sequelize } = require("./models/")
const { initModels } = require("./models/init-models.js");
models = initModels(sequelize);
// Routers

//Usuario router
require("./routes/usuario-routes")(app)
//Pedido router
require("./routes/pedido-routes")(app)
//Deatlhes do Pedido router
require("./routes/det_pedido-routes")(app)
//Auth Router
require('./routes/auth-routes')(app)
//ResetToken Router
require('./routes/resettoken-routes')(app)


db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("/////////////---Server running on port 3002---/////////////");
    // initial();
  });
});

// function initial() {
//   models.tipo_usuario.bulkCreate([
//     {
//       id: 1,
//       descricao: "user"
//     },
//     {
//       id: 2,
//       descricao: "moderator"
//     },
//     {
//       id: 3,
//       descricao: "admin"
//     }
//   ])
  // models.acabamento.bulkCreate([{ id_acabamento: 1,
  // }, { /* record two */ }])
// }
