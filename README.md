# Reprography System || Back-end

## Apresentation
Welcome, this project is our the Course Conclusion Work <a href="https://pt.wikipedia.org/wiki/Trabalho_de_conclus%C3%A3o_de_curso"> (TCC) </a> of the technical course in Development of systems of the School SENAI Swiss-Brazilian Paulo Ernesto Tolle.

[Front-end Github](https://github.com/ViictorSR388/reprografia_front-end)

#### Project Status: ⚠️ Under development ⚠️

## About the project
This application was requested by the coordinator of the Senai Suiço-Brasileira school, in order to control the prints made by the different sectors of the school (teachers, employees, etc.), thus being able to better manage expenses and waste.
## 📌 Resources used in this project:


 **<a href="https://code.visualstudio.com/Download">:small_blue_diamond: Visual Studio Code </a>**<img align="center"  height="30" width="30" src="https://cdn.freebiesupply.com/logos/large/2x/visual-studio-code-logo-png-transparent.png" style="max-width:100%;"></img> 


**<a href="https://nodejs.org/en/">:small_blue_diamond: NodeJS </a>**<img align="center"  height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" style="max-width:100%;"></img> 


<!-- **<a href="https://www.mysql.com">:small_blue_diamond: MySQL </a>**<img align="center"  height="50" width="60" src="https://pngimg.com/uploads/mysql/mysql_PNG29.png" style="max-width:100%;"></img>  -->


**<a href="https://swagger.io">:small_blue_diamond: Swagger </a>**<img align="center"  height="30" width="30" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" style="max-width:100%;"></img> 

### 📃Back-End Features
The MySQL database was hosted on MariaDB.
Routes were secured through JWT in conjunction with Swagger.

### Used during development
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
  * PostMan - Testing the functionality of the created API.

#### Database Service

**<a href="https://mariadb.org">:small_blue_diamond: MariaDB</a>**<img align="center"  height="60" width="70" src="https://www.softizy.com/blog/wp-content/uploads/2014/05/mariadb.png" style="max-width:100%;"></img> 
 

## :arrow_forward: How to start the application:

 * First download the zipped Config folder from info_api/ <br>
 * Extract it into the API directory (/src)
 * Change the information regarding the database connection (db.config.json )<br>
 * Create the database you inserted in this file (example: bdrepro)<br>
 * Change the information regarding sending email (mailer.config.json)
 
#### Requirements

- Node.js (v14.18.1)
- NPM (6.14.15)

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

Wait for execution and it will be running on URL  `http://localhost:3002`
<br>

And so you will have your application running locally.
<br>

# Business rules and classes:
### USER can:

- Log into;
- Request a new password if you have forgotten it (it will be sent by email);
- View your information (User profile);
- Update your information (only name, email, phone and your profile picture);
- Update your password (entering your old and new passwords);
- Request a reprography (the request will be sent to the responsible company with all the choices made by this user);
- View all your reprographic requests/requests
- Send a FeedBack about the reprography that you requested (it will include whether Answered or Not Answered and your observations);
- Delete your account.

---------------------------------------------

### Manager/ADMIN can:

All user permissions
+
- Register Users;
- View all users;
- View any other user by Name, NIF...;
- Update any other user by NIF
- Delete any other user by NIF;
- View all Orders;
- View all orders by order id, order title, by the nif of the user who requested the order...

---------------------------------------------

### Business rules:

- A user can only request a copy if he is authenticated (logged in);
- Only a user identified as ADMIN can register users;
- Users who are not ADMIN can only view the reproductions made by their own account;
- All users (either ADMIN or Normal user) can only evaluate orders placed by their own account;
- All services have pre-established quantities and when they reach 0, it will not be possible to request the reprography that contains that service (example: A3 & Black and White);
- Only users with different NIFS and E-mails will be registered.
- Only files whose extension is an image (.jpeg, .jpg, .png...) can be uploaded to the user profile image. And for the attachment, only files like: .PDF, .DOCX and .XLSX will be accepted.
- You need two Services from the "services" table to place an order. And it is also necessary that neither of these two services have their quantity exhausted ( <= 0)
- An order can only be placed if the multiplication of the number of copies with the number of pages entered by the user is smaller (<) than the quantity of the two services.
- An order can only be evaluated if it exists and has not yet been evaluated.
---------------------------------------------


## :triangular_flag_on_post: Endpoints

With our documentation made with Swagger, we were able to simplify the development of our API, through the set and tools that Swagger itself makes available to us, helping to design and document APIs at scale.

API documentation (Swagger) running on: `http://localhost:3002/docs`

![image](https://user-images.githubusercontent.com/71889159/139081009-8728042d-ac41-44a6-8fbf-f367099d3051.png)
