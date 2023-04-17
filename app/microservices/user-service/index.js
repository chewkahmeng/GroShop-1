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
  database: "userservice",
  multipleStatements : true
});
//test connection. if cannot connect then try 
//execut this in mysql workbench
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
db.connect(function(err) {
  if(err) throw err;
  console.log("connected")
})


app.get("/:id/deleteuser", (req, res) => {
  const userid =req.params.id;
  var q1 = `
  SELECT *
  FROM
    userservice.tbl_user 
  WHERE 
    (id = ${userid});
  DELETE FROM 
    userservice.tbl_user 
  WHERE 
    (id = ${userid});
  DELETE FROM 
    userservice.tbl_address 
  WHERE 
    (userId = ${userid});`
  
  db.query(q1, (err, data)=> {
    if(err){
      return res.json(err)
    }
    else{
      if(data[0]=''){
        res.send({
          message: "User was deleted successfully!"
        });
      }else{
        res.send({
          message: `Cannot delete User with id=${userid}. Maybe User was not found!`
        });
      }      
    }
  })
})

app.get("/:id/getuserprofile", (req, res) => {
  const userid =req.params.id;
  var q1 = `
  SELECT 
	  *
	FROM 
		userservice.tbl_user 
    where 
		id=${userid};
  SELECT 
    *
  FROM 
    userservice.tbl_address 
  where 
    userId=${userid};`
  
  db.query(q1, (err, data)=> {
    if(err){
      return res.json(err)
    }
    else{
      const result = {
        user: data[0][0],
        address: data[1][0]
      }
      return res.json(result);
    }
  })
})

app.listen(4001, () => {
  console.log("Listening on 4001");
});
