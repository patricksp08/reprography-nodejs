const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3002;

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

//Função para inserir os registros fixos de alguams tabelas (como tipo_usuario, tipo_copia, etc...)
const registros = require("./helpers/inserirRegistros")

//Gerar Json do Swagger com as rotas da aplicação
// const { swaggerauto } = require("./helpers/swagger-autogen")

// Routers

//Usuario router
require("./routes/usuario-routes")(app)
//Gerente router
require("./routes/gerente-routes")(app)
//Pedido router
require("./routes/pedido-routes")(app)
//Deatlhes do Pedido router
require("./routes/det_pedido-routes")(app)
//Auth Router
require('./routes/auth-routes')(app)
//ResetToken Router
require('./routes/resettoken-routes')(app)
//Swagger Routes
require('./routes/swagger')(app)

db.sequelize.sync({force: true}).then(() => {
  app.listen(port, async () => {
    await registros.Inserir();
    console.log(`(||||||||| | | -------- Server running on port ${port} -------- | | |||||||||)`);
  });
});