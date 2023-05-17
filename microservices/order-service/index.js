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

app.post("/createorder", (req, res) => {
  var q1 = `
  INSERT INTO orderservice.orders (cartId, userId, amount, createdat) VALUES ("${req.body.cartId}", "${req.body.userId}", "${req.body.amount}", now());
  `
  console.log(q1);
  db.query(q1, (err, data)=> {
    if(err){
      return res.json(err)
    } else {
      console.log(data)
      return res.send({
        message: `Order created successfully!`
      });
    }
  })
})

app.get("/:id/getorder", (req, res) => {
  var query = `
  SELECT * FROM orderservice.orders where userid=${req.params.id};
  `
  db.query(query, (err, data)=> {
    if(err){
      return res.json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "User does not exist!"
        });
      }
      console.log(query)
      const result = {
        order: data
      }
      return res.json(result);
    }
  })
})




app.listen(4004, () => {
  console.log("Listening on 4004");
});
