const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
//const db = require('./db.js');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cartservice"
});
//test connection. if cannot connect then try 
//execut this in mysql workbench
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
db.connect(function(err) {
  if(err) throw err;
  console.log("connected")
})

// microservice api to be called in cart.routes.js
app.get("/:id/api", (req, res) => {
  const userid =req.params.id;
  const q = `
  SELECT 
	  productId
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

app.listen(4000, () => {
  console.log("Listening on 4000");
});
