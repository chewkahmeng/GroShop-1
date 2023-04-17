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

app.post("/:id/updateuser", (req, res) => {
  const userid =req.params.id;
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  let output = JSON.stringify(req.body);
  output = output.toString().replace("{", "");
  output = output.toString().replace("}", "");
  output = output.toString().replace(/:/g, "=");
  if(output.toString().search("username")){
    output = output.toString().replace(`"username"`, `username`);
  };
  if(output.toString().search("password")){
    output = output.toString().replace(`"password"`, `password`);
  };
  if(output.toString().search("email")){
    output = output.toString().replace(`"email"`, `email`);
  };
  if(output.toString().search("role")){
    output = output.toString().replace(`"role"`, `role`);
  };
  if(output.toString().search("createdAt")){
    output = output.toString().replace(`"createdAt"`, `createdAt`);
  };
  if(output.toString().search("updatedAt")){
    output = output.toString().replace(`"updatedAt"`, `updatedAt`);
  };
  console.log(output);
  //UPDATE `userservice`.`tbl_user` SET `password` = '$2b$10$8A8/EfrDMyoJQ2.aPkNCH.CITxygrA9XvWoqBlYWmCj1VOnR2', `email` = '123@123.m' WHERE (`id` = '1');
  var q1 = `
  UPDATE userservice.tbl_user	SET 
		${output}
    where 
		id=${userid};`
  console.log(q1);
  db.query(q1, (err, data)=> {
    if(err){
      return res.json(err)
    }
    else{
      return res.send({
        message: `User details: ${output}, updated successfully!`
      });
    }
  })
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
