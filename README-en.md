<h3 align="center">🚧 ⚠️ In Progress... ⚠️ 🚧</h3>


 
 
<h2 align="center">Reprographic System - Back-end</h2>

<div align="center">
 <img src="https://img.shields.io/badge/Node.js-43853D?style=&logo=node-dot-js&logoColor=white" />
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=&logo=javascript&logoColor=black" />
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
      <img height="80" width="80" href="https://www.javascript.com" src="https://www.seekpng.com/png/full/80-803501_javascript-logo-logo-de-java-script-png.png" style="max-width:100%;"></img>
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

2. Put the `.env.sample` file in [/src](https://github.com/Squad-Back-End/reprography-nodejs/tree/master/src) and remember to rename this file to `.env.dev` if you want to use it in development or `.env` if you want to use it in production.

**Remember**: What will define that you are running the API in **development mode** is the `NODE_ENV=dev` command before the start command. But we've already left everything set up for you on package.json. If you run the "dev" script, it will run with the environment variables (important to have the `.env.dev` created), otherwise it will run with the normal environment variables. 

3. The `.env.sample` file is used to configure all the environment variables you need, such as information about your **database**. Change all the information so that the application works properly.

```bash
# Data Base
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_DIALECT=

# Mailer
MAILER_SERVICE= #example: hotmail
MAILER_USER=
MAILER_PASS=
MAILER_COMPANY_EMAIL=
MAILER_HOST_PORT= #Front-end Host and Port that will be sent in password recovery email

#JWT 
JWT_SECRET_KEY=
HEADER_KEY=
SALT_ROUNDS=

#First Account in application
ADMIN_EMAIL=
ADMIN_PASS=
```


### Starting the server

**Important:** Before you start the application, first create the **database** that you entered in DB_DATABASE in the configuration file of the environment variables.

Run the command below to start Nodejs and connect to the database:
``` bash
# To start in development mode (requires nodemon) -> will run the package.json "dev" script.
$ npm run dev

# To start normally -> will run the "start" script of package.json.
$ npm run start
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
