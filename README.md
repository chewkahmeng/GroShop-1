# GroShop
## Installation and Set-up
1. Install MySQL and MYSQL Workbench. 
2. Set up local databases for each microservice under `microservices` folder, i.e. `userservice`, `recipeservice` etc. Run the files in `db scripts` folder to set up the database and insert data.
3. Create `.env` file in main directory and set up properties like SESSION_SECRET etc. See `.env.example` file for reference. This is used for user authentication. (committed the .env file)
4. In the `app` folder and each microservice under `microservices` folder, if there are no node_modules present, run `npm ci` inside each of these directories to install the necessary node_modules from the `package-lock.json` file 
5. Run `npm start` in all the microservices under `microservices` folder to start running the microservices' server.
6. Run `npm start` for the main application to run the client side application.

## Code Structure
- `microservices` contains all the microservices
    - `cart-service` - product microservice that runs on `port 4000`
    - `product-service` - product microservice that runs on `port 4005`
    - `recipe-service` - recipe microservice that runs on `port 4003`
    - `user-service` - user microservice that runs on `port 4001`
    - `order-service` - user microservice that runs on `port 4004`
- `app` - main application that runs on `port 8080`
    - `config` contains all configuration files
    - `middleware` contains all the middleware files that are used in request validation etc
    - `routes` contains all the client api routes and functions to render the pages
    - `tests` contains the test scripts
    - `node_modules` - imported npm packages that are used in the application
    - `public` - public static content
        - `css` contains all the css files
        - `images` contains all the image files used in application
    - `views` contains all application EJS templates (EJS = HTML markup with Javascript)
        - `admin` contains all the admin templates
        - `partials` contains all the partials templates that can be used in both admin and user
        - `user` contains all the user templates
    - `package-lock.json`
    - `package.json`
    - `server.js` - main application file to run (also imports all the routes from `routes` folder)
- `db scripts` - run the db scripts to create databases and insert data.
- `scripts` - contains the deployment and shell scripts

## Explanation on the code structure/framework
1. Each of the `microservices` contains all the server-side APIs that would change the data its respective database.
2. Client-side APIs in the `routes` folder would call the `microservices` APIs to insert/update/view/delete information in their respective microservices' database.
3. Client-side APIs in the `routes` folder would render the EJS pages to be seen on the browser. 

In summary, `microservices`  &rarr; called by &rarr; `app/routes/*.routes.js`  &rarr; renders &rarr; `app/views/.../*.ejs`

## Completed Services
1. User
    - Register/Login/Logout User
    - Change User Password
    - Update/View/Delete User
    - Add/Update/View/Delete Shipping Address

2. Recipe 
    - Admin can Add/Update/View/Delete recipe details, photo, ingredients and steps.
    - All Users can View recipe details, photo, ingredients and steps.
    - Only Logged In Users can Favourite/Comment on recipes.

3. Product
    - Admin can Add/Update/View/Delete product details, photo

4. Cart
    - User can add items to cart from View Recipe page
    - User can view my cart page
    - User can checkout cart.

5. Payment gateway using Stripe
    - User can make payment via credit card via Stripe

6. Order 
    - Order record for user is automatically created upon successful payment.
    - User can view order history.

## Troubleshooting
1. If a MySQL DB has already been created before and there is connection issues with the DB, run the following query in MYSQL workbench.
    - `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`


## References
1. EJS Usage [https://blog.logrocket.com/how-to-use-ejs-template-node-js-application/]
2. EJS Syntax [https://github.com/mde/ejs/blob/main/docs/syntax.md]
3. Bootstrap References [https://getbootstrap.com/docs/5.1/getting-started/introduction/]
4. FontAwesome Icons [https://fontawesome.com/icons]

