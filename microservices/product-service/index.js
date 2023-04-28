const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");


const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "productservice",
  multipleStatements : true
});
//test connection. if cannot connect then try 
//execut this in mysql workbench
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
db.connect(function(err) {
  if(err) throw err;

  console.log("connected")
})


////////////////////////////////////////////////////
// MAIN PRODUCT FUNCTIONS
////////////////////////////////////////////////////
// GET ALL PRODUCTS
app.get("/getallproducts", (req, res) => {
  var query = `
    select product.*, image.srcpath as srcpath
    from productservice.tbl_product product, productservice.tbl_product_image image
    where product.id = image.productId;
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting products"
        });
      }
      console.log(JSON.stringify(data))
      const result = {
        products: data
      }
      return res.json(result);
    }
  })
})

// GET ALL PRODUCTS WITH PAGINATION (LIMIT AND OFFSET)
app.get("/getallproducts/:limit/:offset", (req, res) => {
  var query = `
    select count(1) as count from productservice.tbl_product product, productservice.tbl_product_image image where product.id = image.productId;
    select product.*, image.srcpath as srcpath
    from productservice.tbl_product product, productservice.tbl_product_image image
    where product.id = image.productId
    limit ${req.params.limit} offset ${req.params.offset};
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting products"
        });
      }
      console.log(`products: ${JSON.stringify(data)}`)
      const result = {
        count: data[0][0]["count"],
        products: data[1]
      }
      return res.json(result);
    }
  })
})

// CREATE NEW PRODUCT
app.post("/createproduct", (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const product = {
    name: `'${req.body.name}'`,
    description: req.body.description ? `'${req.body.description}'` : null,
    quantity: `'${req.body.quantity}'`,
    price: `'${req.body.price}'`
  };
  let output = `
    ${product.name},
    ${product.description},
    ${product.quantity},
    ${product.price}
  `
  var query = `
    INSERT into productservice.TBL_PRODUCT
    (NAME, DESCRIPTION, QUANTITY, PRICE)
    VALUES(${output});
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.json(err)
    }else{
      const result = {
        product: data
      }
      return res.json(result)
    }
  })
})

// UPDATE PRODUCT
app.post("/:id/updateproduct", (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const productId = req.params.id
  const product = {
    name: `'${req.body.name}'`,
    description: req.body.description ? `'${req.body.description}'` : null,
    quantity: `'${req.body.quantity}'`,
    price: `'${req.body.price}'`
  };
  let output = `
  name = ${product.name},
  description = ${product.description},
  quantity = ${product.quantity},
  price = ${product.price}
  `
  var query = `
    UPDATE productservice.TBL_PRODUCT SET
    ${output}
    where id = '${productId}';
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.json(err)
    }else{
      return res.send({
        message: `Product details: ${output}, updated successfully!`
      });
    }
  })
})

// DELETE PRODUCT
app.post("/:id/deleteproduct", (req, res) => {
  const productId = req.params.id
  var query = `
    DELETE FROM productservice.TBL_PRODUCT where id = '${productId}';
    DELETE FROM productservice.TBL_PRODUCT_IMAGE where productId = '${productId}';
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.json(err)
    }else{
      return res.send({
        message: `Product details: ${productId}, deleted successfully!`
      });
    }
  })
})

// GET PRODUCT (for Admin)
app.get("/:id/getproduct", (req, res) => {
  const productId = req.params.id
  var query = `
    SELECT * FROM productservice.TBL_PRODUCT where id = '${productId}';
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting products"
        });
      }
      console.log(JSON.stringify(data))
      const result = {
        product: data[0]
      }
      return res.json(result);
    }
  })
})

// GET PRODUCT DETAILS (for Admin)
app.get("/:id/getproductdetails", (req, res) => {
  const productId = req.params.id
  var query = `
    SELECT * FROM productservice.TBL_PRODUCT where id = '${productId}';
    SELECT * FROM productservice.TBL_PRODUCT_IMAGE where productId = '${productId}';
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting products"
        });
      }
      console.log("getting product details")
      console.log(data)
      const result = {
        product: data[0][0],
        image: data[1][0]
      }
      return res.json(result);
    }
  })
})

// GET PRODUCT (for User)
app.get("/:userId/getproductdetailsforuser/:productId", (req, res) => {
  const productId = req.params.productId
  const userId = req.params.userId
  var query = `
    SELECT * FROM productservice.TBL_PRODUCT where id = '${productId}';
    SELECT * FROM productservice.TBL_PRODUCT_IMAGE where productId = '${productId}';
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.json(err)
    } else {
      console.log(query)
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting products"
        });
      }
      console.log(data)
      const result = {
        product: data[0][0],
        image: data[1][0]
      }
      return res.json(result);
    }
  })
})

////////////////////////////////////////////////////
// PRODUCT PHOTO FUNCTIONS
////////////////////////////////////////////////////
// UPLOAD PRODUCT PHOTO
app.post('/:id/uploadphoto', (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const image = {
    type: req.body.type,
    name: req.body.name,
    srcPath: req.body.srcPath
  }
  let output = `
  '${image.type}',
  '${image.name}',
  '${image.srcPath}'
  `
  var query = `
  INSERT into productservice.TBL_PRODUCT_IMAGE
  (type, name, srcPath)
  VALUES(${output});
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.json(err)
    }else{
      const result = {
        image: data
      }
      return res.json(result)
    }
  })
})

// SAVE PRODUCT PHOTO TO PRODUCT
app.post('/:id/savephototoproduct', (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const imageId = req.body.imageId
  const productId = req.params.id
  // only 1 photo per product
  var query = `
  DELETE from productservice.TBL_PRODUCT_IMAGE
  where productId = '${productId}' and id != '${imageId}';
  UPDATE productservice.TBL_PRODUCT_IMAGE
  SET productId = '${productId}'
  WHERE id = '${imageId}';
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.json(err)
    }else{
      return res.send({
        message: `Image is saved to product: ${productId} successfully!`
      });
    }
  })
})

// GET PHOTO BY PRODUCTID
app.get('/:id/getphotobyproduct', (req, res) => {
  const productId = req.params.id;
  var query = `
  select image.* from productservice.tbl_product_image image
  where image.productId = '${productId}';
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "No photo uploaded yet"
        });
      }
      console.log(JSON.stringify(data))
      const result = {
        image: data
      }
      return res.json(result);
    }
  })
})

// GET PHOTO BY IMAGEID
app.get('/:id/getphotobyid', (req, res) => {
  const imageId = req.params.id;
  var query = `
  select image.* from productservice.tbl_product_image image
  where image.id = '${imageId}';
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "No photo uploaded yet"
        });
      }
      console.log(JSON.stringify(data))
      const result = {
        image: data
      }
      return res.json(result);
    }
  })
})

//SEARCH PRODUCT
app.get("/searchproducts", (req, res) => {
  const queryParams = {
    name: req.query.name ? req.query.name : null,
    price: req.query.price ? req.query.price : null,
    limit: req.query.limit,
    offset: req.query.offset
  }

  let filteredQuery = ""
  if (queryParams.name != null) filteredQuery += `and upper(product.name) like upper('%${queryParams.name}%')`
  if (queryParams.price != null) filteredQuery += `and product.price <= ${queryParams.price}`

  var query = `
  select count(1) as count 
  from productservice.tbl_product product, productservice.tbl_product_image image 
  where product.id = image.productId ${filteredQuery};
  select product.*, image.srcpath as srcpath
  from productservice.tbl_product product, productservice.tbl_product_image image
  where product.id = image.productId ${filteredQuery}
  limit ${queryParams.limit} offset ${queryParams.offset};
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting products"
        });
      }
      console.log(`products: ${JSON.stringify(data)}`)
      const result = {
        count: data[0][0]["count"],
        products: data[1]
      }
      return res.json(result);
    }
  })

})

////////////////////////////////////////////////////
// INITIALISE SERVER
////////////////////////////////////////////////////
app.listen(4005, () => {
  console.log("Listening on 4005");
});
