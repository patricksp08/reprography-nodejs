<h3 align="center">🚧 ⚠️ In Progress... ⚠️ 🚧</h3>


 
 
<h2 align="center">Reprographic System - Back-end</h2>

<div align="center">
 <img src="https://img.shields.io/badge/Node.js-43853D?style=&logo=node-dot-js&logoColor=white" />
 <img src="https://img.shields.io/badge/Express.js-000000?style=&logo=express&logoColor=white" />
<img src="https://img.shields.io/github/license/luccazx12/reprography-nodejs">
 <img src="https://img.shields.io/github/repo-size/luccazx12/reprography-nodejs">
 <img src="https://img.shields.io/github/last-commit/luccazx12/reprography-nodejs">
 </div>



## Introduction
Welcome, this project is our Final Course Paper <a href="https://pt.wikipedia.org/wiki/Trabalho_de_conclus%C3%A3o_de_curso">(TCC)</a> of the technical course of Development of systems of the SENAI Suiço-Brasileira Paulo Ernesto Tolle School.

#### [Project Front-end Github](https://github.com/ViictorSR388/reprografia_front-end)


## About the project
This application was requested by the coordinator of the Senai Suiço-Brasileira school, in order to control the prints made by the different sectors of the school (teachers, employees, etc.), thus being able to better manage costs and waste.

## 📌 Resources used in this project:


<table align="center">
 <th><h3>Runtime environment</h3></th>
 <th><h3>Language</h3></th>
 <th><h3>Data Base</h3></th>
 <th><h3>Framework</h3></th>
 <th><h3>Code Editor</h3></th>
 <th><h3>Documentation</h3></th>
  <tr>
    <td valign="top" align="center">
      <img height="80" width="80" href="https://nodejs.org/en/" src="https://cdn-icons-png.flaticon.com/512/919/919825.png" style="max-width:100%;"></img>
    </td>

   <td valign="top" align="center">
      <img height="90" width="90" href="https://www.javascript.com" src="https://lh3.googleusercontent.com/proxy/WJkD7LaygVUq0RJLsKv-uDZqwjuIROISkU4SLwTfHlOeZMgxglJmEQoUEpomsFVZ7OxJ2QMrG6VAH4A_yVzjxlvcbC0YZjkhaYHOeBV3C_e3jxzEtkF4tlqQFazqkTbrr7_XiS2F6axbYUU83xo" style="max-width:100%;"></img>
      </td>
  
   <td valign="top" align="center">
      <img height="80" width="80" href="https://mariadb.org" src="https://e3z7c6v7.rocketcdn.me/blog/wp-content/uploads/2018/03/mariadb.png" style="max-width:100%;"></img>
    </td>

   <td valign="top" align="center">
      <img height="80" width="80" href="https://expressjs.com" src="https://hackr.io/tutorials/learn-express-js/logo/logo-express-js?ver=1557508379" style="max-width:100%;"></img>
    </td>

   <td valign="top" align="center">
      <img height="80" width="80" href="https://code.visualstudio.com/Download" src="https://cdn.freebiesupply.com/logos/large/2x/visual-studio-code-logo-png-transparent.png" style="max-width:100%;"></img>
    </td>

   <td valign="top" align="center">
      <img height="80" width="80" href="https://swagger.io" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" style="max-width:100%;"></img>
    </td>
  </tr>
</table>


### Project dependencies
- Nodejs
  * Express 4.17.1 - It is a framework for Node.js that provides minimal resources for building web servers.
  * Swagger-autogen 2.11.2
  * Nodemon 2.0.13 - To restart the server whenever there is a change.
  * Jwt - To protect private routes.
  * Bcrypt 5.0.1 - To Encrypt user passwords before saving to bank.
  * Cors 2.8.5 - It is a mechanism used by browsers to share resources between different sources
  * Multer 1.4.2 - It is a node.js middleware to handle multipart, which is mainly used to upload files.
  * Body-Parser 1.19.0 - Parses the JSON encoded data, buffer, string and URL sent using the HTTP POST request.
  * MariaDB 2.5.4 - It's the database we use.



## :arrow_forward: How to start the application:

### Pre-requisites

Before you start, you will need to have installed on your machine the following tools:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

Besides, it's good to have an editor to work with the code as: [VSCode](https://code.visualstudio.com).


### Configuring

1. Clone or download this repository to your machine.
2. Extract the file [".config.zip"](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/info_api/.config.zip) located in ["./info_api/"](https://github.com/Squad-Back-End/reprography-nodejs/tree/master/info_api) to the folder ["./src"](https://github.com/Squad-Back-End/reprography-nodejs/tree/master/src).
3. Then, inside the .config folder, there are three files to set up: auth.config.json, db.config.json and mailer.config.json.

#### auth.config.json

Here are the JWT and first account settings of the application.

 - Change the fields with the values as "changeThis".
 - In jwt.secret will be the secret word to be verified within the token, which we can verify if it is present in the header of the request, for example.
 - In Header will be the name of the key to be stored in the header.
 - In AdminAccount, we have some fields to change that concern the first API account, which is administrator and we will use to create other users.

```bash
{
  "jwt": {
    "secret": "changeThis",
    "header": "changeThis",
    "saltRounds": 10
  },
  "adminAccount": {
    "email": "changeThis@changeThis.com",
    "pass": "changeThis",
    "defaultImage": "uploads/user-img/default/usuario.png"
  }
}
```

#### db.config.json

Here are the connection settings with the database.

- Change the fields that contain the value "changeThis".
- Remembering that we only leave the beginning of the file as an example. Change the rest (test connections, production...) Remembering that we only leave the beginning of the file as an example. Change the rest (test connections, production...) to your preferred.

```bash
{
    "development": {
        "username": "changeThis",
        "password": "changeThis",
        "database": "changeThis",
        "host": "changeThis",
        "port": "changeThis",
        "dialect": "mariadb",
        "dialectOptions": {
            "useUTC": false,
            "dateStrings": true,
            "typeCast": true
        },
        "timezone": "-03:00"
    },
                                 ...
```    

##### mailer.config.json

Here are the e-mail sending settings. 

- Change the fields that contain the value "changeThis".
- In "auth" we have the information of the email that will be used for the application. With it, password recovery emails will be sent to registered users, if requested, and request and evaluation emails to the email listed as "reproEmail" (company responsible for reprographies) when requested.

```bash
{
  "hotmail": {
    "secureConnection": false,
    "service": "hotmail",
    "auth": {
      "user": "changeThis@changeThis.com",
      "pass": "changeThis"
    },
    "tls": {
      "ciphers": "SSLv3"
    }
  },
  "reproEmail": "changeThis@changeThis.com",
  "host": "http://localhost:3002"
}
```   

### Installing the packages

Run the command below to install the dependencies:
``` bash
$ npm install
```

### Starting the server

Run the command below to start Nodejs and connect to the database:
``` bash
# To start in development mode (requer nodemon)
$ npm run dev

# To start normally
$ npm run
```

Wait for execution and it will be running on the URL `http://localhost:3002`

<br>
And so you will have your application running locally.
<br>


## 📄 Documentation:

  * [Business rules](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/info_api/docs/business_rules_and_classes.txt)

#### Diagrams: 

 * [Class Diagram](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/info_api/docs/diagramas/diagramas_de_classe/Diagramas%20de%20Classe%20%20Back-End%20V1.png)
 * [Activity Diagrams](https://github.com/Squad-Back-End/reprography-nodejs/tree/master/info_api/docs/diagramas/diagramas_de_atividade)
 * [Use Case Diagram](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/info_api/docs/diagramas/diagramas_casos_de_uso/Diagrama_de_Caso_de_Uso.png)


### :triangular_flag_on_post: Swagger


By creating the documentation with Swagger, we were able to simplify not only the development of our API and squad as a whole, but also the relationship with the other parts of the project (front-end squad, infra...). So we try our best to make it self-explanatory and complete.

⚡ API Documentation (Swagger) running on: `http://localhost:3002/docs/`

![image](https://raw.githubusercontent.com/Squad-Back-End/reprography-nodejs/master/info_api/screenshots/swagger/swagger.png)


## 😯 How to contribute to with the project

1. Do a **fork** of the project.
2. Create a new branch with your changes: `git checkout -b my-feature`
3. Save the changes and create a commit message telling you what you've done: `git commit -m "feature: My new feature"`
4. Submit your changes: `git push origin my-feature`
> If you have any questions check out this [guide on how to contribute to GitHub](https://github.com/firstcontributions/first-contributions)


## :rocket: Developers :octocat:

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/Luccazx12">
    <img src="https://avatars.githubusercontent.com/u/71888383?v=4" width="100px" alt="Imagem do perfil de Lucca"/>
    <br />
     <sub><b>Lucca</b></sub><br />:snowflake:TechLead:snowflake:
     </td>
    <td align="center"><a href="https://github.com/patricksp08">
    <img src="https://avatars.githubusercontent.com/u/71887999?v=4" width="100px" alt="Imagem do perfil de Ṕatrick"/>
    <br />
    <sub><b>Patrick</b></sub><br />:snowflake::snowman::snowflake:
     </td>
    <td align="center"><a href="https://github.com/MrCyberpunKx">
    <img src="https://avatars.githubusercontent.com/u/71890228?v=4" width="100px" alt="Imagem do perfil de Daniel"/>
    <br />
    <sub><b>Daniel Santos</b></sub><br />:snowflake::snowman::snowflake:
     </td>
     <td align="center"><a href="https://github.com/Oseias-maker">
    <img src="https://avatars.githubusercontent.com/u/71889159?v=4" width="100px" alt="Imagem do perfil de Oséias"/>
    <br />
    <sub><b>Oseias Farias Jesus</b></sub><br />:snowflake::snowman::snowflake:
     </td>
    <td align="center"><a href="https://github.com/JoaoOFS">
    <img src="https://avatars.githubusercontent.com/u/71888050?v=4" width="100px" alt="Imagem do perfil de João"/>
    <br />
    <sub><b>João Otávio</b></sub><br />:snowflake::snowman::snowflake:
     </td>
         <td align="center"><a href="https://github.com/Tiagogtr">
    <img src="https://avatars.githubusercontent.com/u/71888086?v=4" width="100px" alt="Imagem do perfil de Tiago"/>
    <br />
    <sub><b>Tiago Soares</b></sub><br />:snowflake::snowman::snowflake:
     </td>
      
     
     
  
 </tr>
    
</table>

## 📝 license

This project is under the MIT license.
