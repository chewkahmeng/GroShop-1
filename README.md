# GroShop
## Installation and Set-up
1. Install MySQL and MYSQL Workbench to create local databases. 
2. Set up local databases for each microservice under `microservices` folder, i.e. `userservice`, `recipeservice` etc.
3. Create `.env` file in main directory and set up properties like SESSION_SECRET etc. See `.env.example` file for reference. This is used for user authentication.
4. Run `npm start` in all the microservices under `microservices` folder to start running the microservices' server.
5. Run `npm start` for the main application to run the client side application.

## Code Structure (to be modified)
- `app` - main application directory
    - `config` contains all configuration files
    - `microservices` contains all the microservices
        - `cart-service` 
        - `user-service` 
        - `recipe-service` 
    - `middleware` contains all the middleware files that are used in request validation etc
    - `routes` contains all the client api routes of the application
- `node_modules` - imported npm packages that are used in the application
- `public` - public static content
    - `css` contains all the css files
    - `images` contains all the image files used in application
- `views` contains all application templates
    - `admin` contains all the admin templates
    - `partials` contains all the partials templates that can be used in both admin and user
    - `user` contains all the user templates
- `package-lock.json`
- `package.json`
- `server.js` - main application file to run

## Completed Microservices
1. User
    - Register User
    - Login User
    - Logout User
    - Change User Password
    - Update/View/Delete User
    - Add/Update/View/Delete shipping address

2. Recipe 
    - Admin can Add/Update/View/Delete recipe details, photo, ingredients and steps.
    - All Users can View recipe details, photo, ingredients and steps.
    - Only Logged In Users can Favourite/Comment on recipes.
    




