require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

//Imports para as informações que vamos trazer no console (consumo de ram, uso de cpu...)
const os = require("os");
const utils = require("os-utils");
const process = require("process");
const diskspace = require("diskspace");

//Models
const db = require("./app/models");

//Routers
const router = require("./app/routes/index.js");

//Função para inserir os registros fixos de alguams tabelas (como tipo_usuario, tipo_copia, etc...)
const inserirRegistros = require("./database/insertDb");

const port = process.env.PORT || 3002;

// var corsOptions = {
//   origin: "http://localhost:3000"
// };
// app.use(cors(corsOptions));

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Usando rota de Uploads para renderizar as imagens que estão em /uploads no diretório da API
app.use("/uploads", express.static("uploads"));

// Routers
app.use(router);

//Titulo da API
process.title = "Reprographic System"


//Sincronizando o sequelize com o banco de dados (utilizar o { force: true } somente em desenvolvimento,
// para conseguir limpar o banco e testar com novos registros.)
db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, async () => {
    await inserirRegistros.InserirRegistros();
    await inserirRegistros.InserirUsuario();
    await console.log(`\n(||||||||| | | -------- Server running on port ${port} -------- | | |||||||||)`);
    // let message = process.env.NODE_ENV === "dev" ? "\nDevelopment Mode." : "\nProduction Mode.";
    // console.log(message);
    //Informações sobre a CPU, ARQUITETURA, TOTAL DE MEMÓRIA RAM DISPONÍVEL NO SISTEMA E SEU USO.
    console.log("\nCPUS: ", os.cpus());
    console.log("\nArquitetura do processador: " + process.arch);
    console.log("Plataforma que a API está rodando: " + process.platform);
    console.log("\nTotal de memória ram: " + os.totalmem() + " B");
    console.log("Uso Atual de memória ram: " + Math.round(os.totalmem - os.freemem()) +" B");
    console.log("Memória ram livre: " + Math.round(os.freemem()) + " B");

    //Listando disco tanto do windows quanto do linux
    var disc = "C*";
    if (process.platform == "linux") {
      var disc = "/";
    }

    //Verificando disco (espaço total... livre e status)
    diskspace.check(disc, function (err, result) {
      console.log("\nTamanho total do disco: " + result.total + " B");
      console.log("Espaço do disco utilizado: " + result.used + " B");
      console.log("Espaço livre do disco: " + result.free + " B");
      console.log("Status do disco: " + result.status + "\n");
    });

    //Verificando uso de CPU e uso de Memória
    function infosConsole() {
         utils.cpuUsage(function (v) {
      console.log("\n--------------------------------------------");
            console.log("\nInformações que serão atualizadas em 60 segundos:\n");
            console.log("CPU Usage (%): " + v * 100 + "%");
            console.log("Uso de memória ram: " + Math.round(os.totalmem - os.freemem()) + "B");
            console.log("Memória Livre: " + os.freemem() + " B \n");
            console.log("--------------------------------------------");
         });
    };
    
    function run() {
      setInterval(infosConsole, 60000);
    };
    
    run();
  });
});
