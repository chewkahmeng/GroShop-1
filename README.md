# GroShop
## Installation and Set-up
1. Install MySQL to create local database. 
2. Create `.env` file in main directory and set up properties like SESSION_SECRET etc. See `.env.example` file for reference.
3. Run `npm start` to start the app.

## Object-relational mapping
1. With the incorporation of Sequelize, there is no need to create/drop tables everytime a collaborator makes table changes. 
2. Please see server.js: DB SYNC (SEQUELIZE) section. There are different settings to the DB sync.
3. Sequelize links: 
    - Guide: https://sequelize.org/docs/v6/
    - API references: https://sequelize.org/api/v6/identifiers.html

## Code Structure
- `app` - main application directory
    - `config` contains all configuration files
    - `controllers` contains all the backend functions for the respective microservices
    - `middleware` contains all the middleware files that are used in request validation etc
    - `models` contains all the models of the application
    - `routes` contains all the api routes of the application
- `node_modules` - imported npm packages that are used in the application
- `public` - contains the static content
    - `css` contains all the css files
    - `images` contains all the image files used in application
- `views` contains all application templates
    - `admin` - contains all the admin templates
    - `partials` - contains all the partials templates that can be used in both admin and user
    - `user` - contains all the user templates
- `package-lock.json`
- `package.json`
- `server.js` - main application file to run

## Completed Modules
1. User
    - Register User
    - Login User
    - Logout User
    - Change User Password
    - Update/View/Delete User

2. Address
    - Add/Update/View/Delete shipping address

3. Recipe 
    - Recipe Details
        - Add/Update/View/Delete Recipe (For Admin)
        - Add Recipe Photo (For Admin)
        - View/Favourite/Comment on Recipe (For User)
        
    - Recipe Ingredients
        - Add/Update/View/Delete Recipe Ingredients (For Admin)
        - View Recipe Ingredients (For User)
    
    - Recipe Steps
        - Add/Update/View/Delete Recipe Steps (For Admin)
        - View Recipe Steps (For User)
    




