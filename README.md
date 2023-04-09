# GroShop
## Installation and Set-up
1. Install MySQL to create local database. 
2. Create `.env` file in main directory and set up properties like SESSION_SECRET etc.
3. Run `npm start` to start the app.

## Object-relational mapping
1. With the incorporation of Sequelize, there is no need to create/drop tables everytime a collaborator makes table changes. 
2. Please see server.js: DB SYNC (SEQUELIZE) section. There are different settings to the DB sync.
3. Sequelize links: 
    - Guide: https://sequelize.org/docs/v6/
    - API references: https://sequelize.org/api/v6/identifiers.html

## Modules
1. User
    - Register User
    - Login User
    - Logout User
    - Change User Password
    - Update User Details
    - View User Details
    - Delete User

2. Address
    - Add shipping address
    - Update shipping address
    - View shipping address
    - Delete shipping address

3. Recipe (in-progress)
    - Recipe Details
        - Add Recipe
        - Update Recipe
        - View Recipe
        - Delete Recipe
        - Add Recipe Photo
    - Recipe Ingredients
        - Add Recipe Ingredients
        - Update Recipe Ingredients
        - View Recipe Ingredients
        - Delete Recipe Ingredients
    - Recipe Steps
        - Add Recipe Steps
        - Update Recipe Steps
        - View Recipe Steps
        - Delete Recipe Steps




