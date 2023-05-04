require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const uuid = require('uuid');
//const db = require('./db.js');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// "Promise" wrapped database class
class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        multipleStatements : true
      } );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
//test connection. if cannot connect then try 
//execut this in mysql workbench
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
db.connect(function(err) {
  if(err) throw err;
  console.log("connected")
})

// microservice api to be called in cart.routes.js
app.get("/:id/getcart", (req, res) => {
  const userid =req.params.id;
  const q = `
  SELECT 
	  a.id, a.name, a.amount, a.uom, b.cartId
	FROM 
		cartservice.productincart as a 
	inner join 
		cartservice.cart b 
	on 
		a.cartid = b.cartid 
    where 
		b.userid="${userid}"
	and 
		b.cartstatus="pending";`
  db.query(q, (err, data)=> {
    if(err){
      return res.json(err)
    }
    else{
      return res.json(data)
    }

  })
})

app.get("/:id/addtocart", (req, res) => {
  const database=  new Database();
  const userid =req.params.id;
  const ingredients = req.body.ingredients;
  const newCartId = uuid.v1();
  console.log(JSON.stringify(ingredients))
  database.query( 
    `SELECT * FROM cartservice.cart where cartStatus = "pending" and userID ="${userid}";` )
    .then( rows => {
        console.log("rows", JSON.stringify(rows))
        
        if(JSON.stringify(rows) == "[]"){
          console.log("create new cart here")
          
          console.log("UUID HERE ", newCartId)
          database.query( 
            `
            INSERT INTO cartservice.cart (userId, cartId, cartStatus) VALUES ('${userid}', '${newCartId}', 'pending');`
            )
          for(var i = 0; i < ingredients.length; i++){
            if(ingredients[i+1]== undefined){
              console.log("last element of the array");
              console.log("inserting the following ", ingredients[i].name,ingredients[i].amount,ingredients[i].uom,)
              return database.query( 
                `INSERT INTO cartservice.productincart (name, cartId, amount, uom) VALUES ('${ingredients[i].name}', '${newCartId}' , '${ingredients[i].amount}', '${ingredients[i].uom}');`
                )
            }else{
              database.query( 
                `INSERT INTO cartservice.productincart (name, cartId, amount, uom) VALUES ('${ingredients[i].name}', '${newCartId}' , '${ingredients[i].amount}', '${ingredients[i].uom}');`
                )
                console.log("inserting the following ", ingredients[i].name,ingredients[i].amount,ingredients[i].uom,)
            }
            }
        }else{
          console.log("JSON.stringify(rows[0].cartId): ", JSON.stringify(rows[0].cartId))
          const existingCartId = JSON.stringify(rows[0].cartId);
          console.log("existingCartId ", existingCartId)
          console.log("inserting ingredients to old cart here")
          for(var i = 0; i < ingredients.length; i++){
            if(ingredients[i+1]== undefined){
              console.log("last element of the array");
              console.log("inserting the following ", ingredients[i].name,ingredients[i].amount,ingredients[i].uom,);
              return database.query( 
                `INSERT INTO cartservice.productincart (name, cartId, amount, uom) VALUES ('${ingredients[i].name}', ${existingCartId} , '${ingredients[i].amount}', '${ingredients[i].uom}');`
                )
                
            }else{
              database.query( 
                `INSERT INTO cartservice.productincart (name, cartId, amount, uom) VALUES ('${ingredients[i].name}', ${existingCartId} , '${ingredients[i].amount}', '${ingredients[i].uom}');`
                )
                console.log("inserting the following ", ingredients[i].name,ingredients[i].amount,ingredients[i].uom,)

            }

          }
        }
    }, err =>{
      return database.close().then( () => { throw err; } )
    } ).then(output =>{
      if(output == undefined){
        return res.status(400).send({
          error: "Something went wrong here!",
          output: output
        });
      }else{
        return res.status(200).send({
          message: "Ingredients Added to Cart!",
          output: output
        });
      }

      database.close()
      
    }).catch( err =>{
      return res.json(err);
    })
  // const q = `
  // INSERT INTO cartservice.productincart (productId, cartId, quantity) VALUES ('4', '1', '4');`
  // for(let i = 0; i<4;i++){
  //     db.query(q, (err, data)=> {
  //   if(err){
  //     return res.json(err)
  //   }
  //   else{
  //     return res.json(data)
  //   }

  // })
  // }

})

app.get("/:id/removefromcart", (req, res) => {  
  const userid =req.params.id;
  const itemId =req.body.itemId;
  const q = `
  DELETE FROM cartservice.productincart WHERE (id = '${itemId}');`
  db.query(q, (err, data)=> {
    if(err){
      return res.json(err)
    }
    else{
      return res.json(data)
    }

  })
})



app.listen(4000, () => {
  console.log("Listening on 4000");
});
