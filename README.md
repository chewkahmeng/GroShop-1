# GroShop
## Installation
1. Install MySQL to create local database. 
2. Execute scripts in db_scripts folder.
3. Run `npm start` to start the app.

## Object-relational mapping
1. With the incorporation of Sequelize, there is no need to create/drop tables everytime a collaborator makes table changes. 
2. Please see server.js: DB SYNC (SEQUELIZE) section. There are different settings to the DB sync.
3. Sequelize links: 
    - Guide: https://sequelize.org/docs/v6/
    - API references: https://sequelize.org/api/v6/identifiers.html

## Microservices
1. User
    - Register User
    - Login User
    - Change User Password
    - Update User Details
    - View User Details
    - Delete User

Things left to do for User: 
1. Proper User authentication (maybe using PassportJS, JWT or any other tools)
2. welcome/login/home/profile pages
3. way to differentiate between customer and admin in login.



