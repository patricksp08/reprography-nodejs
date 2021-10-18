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

//Usando rota de Uploads para renderizar as imagens que estão em /uploads no diretório da API
app.use('/uploads', express.static('uploads'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//Models
const db = require("./models");

//Função para inserir os registros fixos de alguams tabelas (como tipo_usuario, tipo_copia, etc...)
const { inserirRegistros } = require("./helpers/")

//Gerar Json do Swagger com as rotas da aplicação
const { swaggerAuto } = require("./helpers/")
swaggerAuto.generateFile;
// Routers

//Usuario router
require("./routes/usuario-routes")(app)
//Pedido router
require("./routes/pedido-routes")(app)
//Deatlhes do Pedido router
require("./routes/detPedido-routes")(app)
//ResetToken Router
require('./routes/resetToken-routes')(app)
//Swagger Routes
require('./routes/swagger')(app)

db.sequelize.sync().then(() => {
  app.listen(port, async () => {
    await inserirRegistros.InserirRegistros();
    await inserirRegistros.InserirUsuario();
    console.log(`(||||||||| | | -------- Server running on port ${port} -------- | | |||||||||)`);
  });
});