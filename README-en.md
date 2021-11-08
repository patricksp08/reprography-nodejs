# Reprographic System - Back-end


## Introduction
Welcome, this project is our Final Course Paper <a href="https://pt.wikipedia.org/wiki/Trabalho_de_conclus%C3%A3o_de_curso"> (TCC) </a> of the technical course of Development of systems of the SENAI Suiço-Brasileira Paulo Ernesto Tolle School.

#### [Project Front-end Github](https://github.com/ViictorSR388/reprografia_front-end)

#### Project Status: ⚠️ Under Development ⚠️

## About the project
This application was requested by the coordinator of the Senai Suiço-Brasileira school, in order to control the prints made by the different sectors of the school (teachers, employees, etc.), thus being able to better manage costs and waste.

## 📌 Resources used in this project:


 **<a href="https://code.visualstudio.com/Download">:small_blue_diamond: Visual Studio Code </a>**<img align="center" height="30" width="30" src ="https://cdn.freebiesupply.com/logos/large/2x/visual-studio-code-logo-png-transparent.png" style="max-width:100%;"></img>

**<a href="https://swagger.io">:small_blue_diamond: Swagger </a>**<img align="center" height="30" width="30" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" style="max-width:100%;"></img>


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

#### Database

**<a href="https://mariadb.org">:small_blue_diamond: MariaDB</a>**<img align="center"  height="60" width="70" src="https://www.softizy.com/blog/wp-content/uploads/2014/05/mariadb.png" style="max-width:100%;"></img> 


## :arrow_forward: How to start the application:

#### Requirements

- Node.js (v14.18.1)
- NPM (6.14.15)

 * Clone or download the repository<br>
 * Then extract the .config folder located in info_api/docs to /src <br>
 * Change the information regarding the database connection (.config/db.config.json)<br>
 * Create the database that inserted this file in your database (mysql/mariadb) - example: bdrepro <br>
 * Change the information regarding sending email (.config/mailer.config.json)


### Installing the packages

Run the command below to install the dependencies:
``` bash
npm install
```

### Starting the server

Run the command below to start Nodejs and connect to the database:
``` bash
npm run
```

Wait for execution and it will be running on the URL `http://localhost:3002`
<br>

And so you will have your application running locally.
<br>


## :triangular_flag_on_post: Endpoints

By creating the documentation with Swagger, we were able to simplify not only the development of our API and the squad as a whole, but also the relationship with the other parts of the project (front-end squad, infra...). That's why we tried our best to make it self-explanatory and complete.

API documentation (Swagger) running at: `http://localhost:3002/docs/`

![image](https://raw.githubusercontent.com/Squad-Back-End/reprography-nodejs/master/info_api/screenshots/swagger/swagger.png)


## Business rules and classes:

### USER can:

- Log into;
- Request a new password if you have forgotten it (it will be sent by email);
- View your information (User profile);
- Update your information (only name, email, phone and your profile picture);
- Update your password (entering your old and new passwords);
- Request a reprography (the request will be sent to the responsible company with all the choices made by this user);
- View all your reprographic requests/requests
- Send a FeedBack about the reprography you requested (it will include whether Answered or Not Answered and your observations);
- Disable your account.

--------------------------------------------

### Manager/ADMIN can:

All user permissions +

- Register Users;
- View all users;
- View any other user by Name, NIF...;
- Update any other user by NIF;
- Activate or deactivate a user;
- View all Orders;
- View all orders by order id, order title, by the nif of the user who requested the order...;
- Create a Service;
- View all services;
- Update a service
- Activate or deactivate a Service;

--------------------------------------------

### Business rules:

- A user can only request a copy if he is authenticated (logged in);
- Only a user identified as ADMIN can register users;
- Users who are not ADMIN can only view the reproductions made by their own account;
- All users (either ADMIN or Normal user) can only evaluate orders placed by their own account;
- All services have pre-established quantities and when they reach 0, it will not be possible to request the reprography that contains that service (example: A3 & Black and White);
- Only users with different NIFS and E-mails will be registered.
- Only files whose extension is an image (.jpeg, .jpg, .png...) can be uploaded to the user profile image. And for the attachment, only files such as: .PDF, .DOCX and .XLSX will be accepted;
- You need two Services from the "services" table to place an order. And it is also necessary that neither of these two services have their quantity exhausted (<= 0);
- An order can only be placed if the multiplication of the number of copies with the number of pages entered by the user is smaller (<) than the quantity of the two services;
- An order can only be evaluated if it exists and has not yet been evaluated;
- A user can only login if they have their account activated;
- Every user on their first access needs to enter a new password for their account, updating the system default password for users created by management (senai115).
