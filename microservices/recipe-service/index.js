require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");


const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
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
// MAIN RECIPE FUNCTIONS
////////////////////////////////////////////////////
// GET ALL RECIPES
app.get("/getallrecipes", (req, res) => {
  var query = `
    select recipe.*, image.srcpath as srcpath
    from recipeservice.tbl_recipe recipe, recipeservice.tbl_recipe_image image
    where recipe.id = image.recipeId;
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.status(400).json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting recipes"
        });
      }
      console.log(JSON.stringify(data))
      const result = {
        recipes: data
      }
      return res.status(200).json(result);
    }
  })
})

// GET ALL RECIPES WITH PAGINATION (LIMIT AND OFFSET)
app.get("/getallrecipes/:limit/:offset", (req, res) => {
  var query = `
    select count(1) as count from recipeservice.tbl_recipe recipe, recipeservice.tbl_recipe_image image where recipe.id = image.recipeId;
    select recipe.*, image.srcPath as srcpath
    from recipeservice.tbl_recipe recipe, recipeservice.tbl_recipe_image image
    where recipe.id = image.recipeId
    limit ${req.params.limit} offset ${req.params.offset};
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.status(400).json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting recipes"
        });
      }
      console.log(`recipes: ${JSON.stringify(data)}`)
      const result = {
        count: data[0][0]["count"],
        recipes: data[1]
      }
      return res.status(200).json(result);
    }
  })
})

app.get("/searchrecipes", (req, res) => {
  const queryParams = {
    name: req.query.name ? req.query.name : null,
    cuisine: req.query.cuisine ? req.query.cuisine : null,
    difficulty: req.query.difficulty ? req.query.difficulty : null,
    servingSize: req.query.servingSize ? req.query.servingSize : null,
    limit: req.query.limit,
    offset: req.query.offset
  }

  let filteredQuery = ""
  if (queryParams.name != null) filteredQuery += `and upper(recipe.name) like upper('%${queryParams.name}%')`
  if (queryParams.cuisine != null) filteredQuery += `and upper(recipe.cuisine) like upper('%${queryParams.cuisine}%')`
  if (queryParams.difficulty != null) filteredQuery += `and upper(recipe.difficulty) like upper('%${queryParams.difficulty}%')`
  if (queryParams.servingSize != null) filteredQuery += `and upper(recipe.servingSize) like upper('%${queryParams.servingSize}%')`

  var query = `
  select count(1) as count 
  from recipeservice.tbl_recipe recipe, recipeservice.tbl_recipe_image image 
  where recipe.id = image.recipeId ${filteredQuery};
  select recipe.*, image.srcPath as srcpath
  from recipeservice.tbl_recipe recipe, recipeservice.tbl_recipe_image image
  where recipe.id = image.recipeId ${filteredQuery}
  limit ${queryParams.limit} offset ${queryParams.offset};
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.status(400).json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting recipes"
        });
      }
      console.log(`recipes: ${JSON.stringify(data)}`)
      const result = {
        count: data[0][0]["count"],
        recipes: data[1]
      }
      return res.status(200).json(result);
    }
  })

})

// CREATE NEW RECIPE
app.post("/createrecipe", (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const recipe = {
    name: `'${req.body.name}'`,
    description: req.body.description ? `'${req.body.description}'` : null,
    cuisine: `'${req.body.cuisine}'`,
    servingSize: `'${req.body.servingSize}'`,
    prepTime: `'${req.body.prepTime}'`,
    prepTimeUom: `'${req.body.prepTimeUom}'`,
    difficulty: `'${req.body.difficulty}'`
  };
  let output = `
    ${recipe.name},
    ${recipe.description},
    ${recipe.cuisine},
    ${recipe.servingSize},
    ${recipe.prepTime},
    ${recipe.prepTimeUom},
    ${recipe.difficulty}
  `
  var query = `
    INSERT into recipeservice.tbl_recipe
    (NAME, DESCRIPTION, CUISINE, SERVINGSIZE, PREPTIME, PREPTIMEUOM, DIFFICULTY)
    VALUES(${output});
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      const result = {
        recipe: data
      }
      return res.status(200).json(result)
    }
  })
})

// UPDATE RECIPE
app.post("/:id/updaterecipe", (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const recipeId = req.params.id
  const recipe = {
    name: `'${req.body.name}'`,
    description: req.body.description ? `'${req.body.description}'` : null,
    cuisine: `'${req.body.cuisine}'`,
    servingSize: `'${req.body.servingSize}'`,
    prepTime: `'${req.body.prepTime}'`,
    prepTimeUom: `'${req.body.prepTimeUom}'`,
    difficulty: `'${req.body.difficulty}'`
  };
  let output = `
  name = ${recipe.name},
  description = ${recipe.description},
  cuisine = ${recipe.cuisine},
  servingSize = ${recipe.servingSize},
  prepTime = ${recipe.prepTime},
  prepTimeUom = ${recipe.prepTimeUom},
  difficulty = ${recipe.difficulty}
  `
  var query = `
    UPDATE recipeservice.tbl_recipe SET
    ${output}
    where id = '${recipeId}';
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      return res.send({
        message: `Recipe details: ${output}, updated successfully!`
      });
    }
  })
})

// DELETE RECIPE
app.post("/:id/deleterecipe", (req, res) => {
  const recipeId = req.params.id
  var query = `
    DELETE FROM recipeservice.tbl_recipe where id = '${recipeId}';
    DELETE FROM recipeservice.tbl_recipe_image where recipeId = '${recipeId}';
    DELETE FROM recipeservice.tbl_recipe_ingredient where recipeId = '${recipeId}';
    DELETE FROM recipeservice.tbl_recipe_step where recipeId = '${recipeId}';
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      return res.send({
        message: `Recipe details: ${recipeId}, deleted successfully!`
      });
    }
  })
})

// GET RECIPE (for Admin)
app.get("/:id/getrecipe", (req, res) => {
  const recipeId = req.params.id
  var query = `
    SELECT * FROM recipeservice.tbl_recipe where id = '${recipeId}';
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.status(400).json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting recipes"
        });
      }
      console.log(JSON.stringify(data))
      const result = {
        recipe: data[0]
      }
      return res.status(200).json(result);
    }
  })
})

// GET RECIPE DETAILS INCLUDING INGREDIENTS, STEPS, PHOTO (for Admin)
app.get("/:id/getrecipedetails", (req, res) => {
  const recipeId = req.params.id
  var query = `
    SELECT * FROM recipeservice.tbl_recipe where id = '${recipeId}';
    SELECT * FROM recipeservice.tbl_recipe_image where recipeId = '${recipeId}';
    SELECT * FROM recipeservice.tbl_recipe_ingredient where recipeId = '${recipeId}';
    SELECT * FROM recipeservice.tbl_recipe_step where recipeId = '${recipeId}' order by createdAt asc;
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.status(400).json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting recipes"
        });
      }
      console.log("getting recipe details")
      console.log(data)
      const result = {
        recipe: data[0][0],
        image: data[1][0],
        ingredients: data[2],
        steps: data[3]
      }
      return res.status(200).json(result);
    }
  })
})

// GET RECIPE (for User)
app.get("/:userId/getrecipedetailsforuser/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId
  const userId = req.params.userId
  var query = `
    SELECT * FROM recipeservice.tbl_recipe where id = '${recipeId}';
    SELECT * FROM recipeservice.tbl_recipe_image where recipeId = '${recipeId}';
    SELECT * FROM recipeservice.tbl_recipe_ingredient where recipeId = '${recipeId}';
    SELECT * FROM recipeservice.tbl_recipe_step where recipeId = '${recipeId}' order by createdAt asc;
    SELECT * FROM recipeservice.tbl_favourites where recipeId = ${recipeId} and userId = ${userId};
    SELECT id, content, author, recipeId, date_format(createdAt,'%d/%m/%Y') as createdAt, date_format(updatedAt,'%d/%m/%Y') as updatedAt FROM recipeservice.tbl_comments where recipeId = '${recipeId}';
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.status(400).json(err)
    } else {
      console.log(query)
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting recipes"
        });
      }
      console.log(data)
      const result = {
        recipe: data[0][0],
        image: data[1][0],
        ingredients: data[2],
        steps: data[3],
        favourite: data[4][0],
        comments: data[5]
      }
      return res.status(200).json(result);
    }
  })
})

////////////////////////////////////////////////////
// RECIPE PHOTO FUNCTIONS
////////////////////////////////////////////////////
// UPLOAD RECIPE PHOTO
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
  INSERT into recipeservice.tbl_recipe_image
  (type, name, srcPath)
  VALUES(${output});
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      const result = {
        image: data
      }
      return res.status(200).json(result)
    }
  })
})

// SAVE RECIPE PHOTO TO RECIPE
app.post('/:id/savephototorecipe', (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const imageId = req.body.imageId
  const recipeId = req.params.id
  // only 1 photo per recipe
  var query = `
  DELETE from recipeservice.tbl_recipe_image
  where recipeId = '${recipeId}' and id != '${imageId}';
  UPDATE recipeservice.tbl_recipe_image
  SET recipeId = '${recipeId}'
  WHERE id = '${imageId}';
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      return res.send({
        message: `Image is saved to recipe: ${recipeId} successfully!`
      });
    }
  })
})

// GET PHOTO BY RECIPEID
app.get('/:id/getphotobyrecipe', (req, res) => {
  const recipeId = req.params.id;
  var query = `
  select image.* from recipeservice.tbl_recipe_image image
  where image.recipeId = '${recipeId}';
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.status(400).json(err)
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
      return res.status(200).json(result);
    }
  })
})

// GET PHOTO BY IMAGEID
app.get('/:id/getphotobyid', (req, res) => {
  const imageId = req.params.id;
  var query = `
  select image.* from recipeservice.tbl_recipe_image image
  where image.id = '${imageId}';
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.status(400).json(err)
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
      return res.status(200).json(result);
    }
  })
})
////////////////////////////////////////////////////
// RECIPE INGREDIENT FUNCTIONS
////////////////////////////////////////////////////
// ADD INGREDIENT
app.post('/:recipeId/addingredient',  (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const recipeId = req.params.recipeId
  const recipeIngredient = {
    name: `'${req.body.name}'`,
    amount: `'${req.body.amount}'`,
    uom: `'${req.body.uom}'`,
    description: req.body.description ? `'${req.body.description}'` : null,
    recipeId: `'${recipeId}'`
  };

  let output = `
  ${recipeIngredient.name},
  ${recipeIngredient.amount},
  ${recipeIngredient.uom},
  ${recipeIngredient.description},
  ${recipeIngredient.recipeId}
  `
  var query = `
  INSERT into recipeservice.tbl_recipe_ingredient
  (name,  amount, uom, description, recipeId)
  VALUES(${output});
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(data)
      return res.send({
        message: `Recipe ingredient details: ${output}, added successfully!`
      });
    }
  })
})

// UPDATE INGREDIENT
app.post('/:recipeId/updateingredient/:ingredientId', (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const recipeId = req.params.recipeId
  const ingredientId = req.params.ingredientId

  const recipeIngredient = {
    name: `'${req.body.name}'`,
    amount: `'${req.body.amount}'`,
    uom: `'${req.body.uom}'`,
    description: req.body.description ? `'${req.body.description}'` : null,
    recipeId: `'${recipeId}'`
  };

  let output = `
  name = ${recipeIngredient.name},
  amount = ${recipeIngredient.amount},
  uom = ${recipeIngredient.uom},
  description = ${recipeIngredient.description},
  recipeId = ${recipeIngredient.recipeId}
  `
  var query = `
  UPDATE recipeservice.tbl_recipe_ingredient SET
  ${output}
  WHERE id = ${ingredientId};
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(data)
      return res.send({
        message: `Recipe ingredient details: ${output}, updated successfully!`
      });
    }
  })
})

// DELETE INGREDIENT
app.post('/:recipeId/deleteingredient/:ingredientId', (req, res) => {
  const recipeId = req.params.recipeId
  const ingredientId = req.params.ingredientId
  
  var query = `
  DELETE FROM recipeservice.tbl_recipe_ingredient 
  WHERE id = ${ingredientId};
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(data)
      return res.send({
        message: `Recipe ingredient details: ${ingredientId}, deleted successfully!`
      });
    }
  })
})

// GET ALL INGREDIENTS IN RECIPE
app.get('/:recipeId/getallingredients', (req, res) => {
  const recipeId = req.params.recipeId
  var query = `
  SELECT * FROM recipeservice.tbl_recipe_ingredient 
  WHERE recipeId = ${recipeId};
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      const result = {
        ingredients: data
      }
      console.log("ingredients: ", result)
      return res.status(200).json(result)
    }
  })
})

////////////////////////////////////////////////////
// RECIPE STEP FUNCTIONS
////////////////////////////////////////////////////
// ADD STEP
app.post('/:recipeId/addstep',  (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const recipeId = req.params.recipeId
  const recipeStep = {
    description: `'${req.body.description}'`,
    recipeId: `'${recipeId}'`
  };

  let output = `
  ${recipeStep.description},
  ${recipeStep.recipeId}
  `
  var query = `
  INSERT into recipeservice.tbl_recipe_step
  (description, recipeId)
  VALUES(${output});
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(data)
      return res.send({
        message: `Recipe step details: ${output}, added successfully!`
      });
    }
  })
})

// UPDATE STEP
app.post('/:recipeId/updatestep/:stepId', (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const recipeId = req.params.recipeId
  const stepId = req.params.stepId

  const recipeStep = {
    description: `'${req.body.description}'`,
    recipeId: `'${recipeId}'`
  };

  let output = `
  description = ${recipeStep.description},
  recipeId = ${recipeStep.recipeId}
  `
  var query = `
  UPDATE recipeservice.tbl_recipe_step SET
  ${output}
  WHERE id = ${stepId};
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(data)
      return res.send({
        message: `Recipe step details: ${output}, updated successfully!`
      });
    }
  })
})

// DELETE STEP
app.post('/:recipeId/deletestep/:stepId', (req, res) => {
  const recipeId = req.params.recipeId
  const stepId = req.params.stepId
  
  var query = `
  DELETE FROM recipeservice.tbl_recipe_step 
  WHERE id = ${stepId};
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(data)
      return res.send({
        message: `Recipe step details: ${stepId}, deleted successfully!`
      });
    }
  })
})

// GET ALL STEPS IN RECIPE
app.get('/:recipeId/getallsteps', (req, res) => {
  const recipeId = req.params.recipeId
  var query = `
  SELECT * FROM recipeservice.tbl_recipe_step 
  WHERE recipeId = ${recipeId}
  order by createdAt asc;
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      const result = {
        steps: data
      }
      return res.status(200).json(result)
    }
  })
})

////////////////////////////////////////////////////
// FAVOURITE RECIPE FUNCTIONS
////////////////////////////////////////////////////
// FAVOURITE RECIPE
app.post('/:userId/favouriterecipe/:recipeId', (req, res) => {
  const recipeId = req.params.recipeId
  const userId = req.params.userId
  
  var query = `
  INSERT INTO recipeservice.tbl_favourites
  (userId, recipeId)
  values('${userId}', '${recipeId}');
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(data)
      return res.send({
        message: `Recipe favourited successfully!`
      });
    }
  })
})

// UNFAVOURITE RECIPE
app.post('/:userId/unfavouriterecipe/:recipeId', (req, res) => {
  const recipeId = req.params.recipeId
  const userId = req.params.userId
  
  var query = `
  DELETE FROM recipeservice.tbl_favourites
  WHERE userId = '${userId}' AND recipeId = '${recipeId}';
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(data)
      return res.send({
        message: `Recipe unfavourited successfully!`
      });
    }
  })
})

// GET FAVOURITE RECIPES FOR USER
app.get('/:userId/getfavouriterecipes', (req, res) => {
  const userId = req.params.userId
  
  var query = `
  select recipe.*, image.srcPath as srcpath
  from recipeservice.tbl_recipe recipe, recipeservice.tbl_recipe_image image
  where recipe.id = image.recipeId 
  and recipe.id in 
    (select fav.recipeId from recipeservice.tbl_favourites fav where fav.userId = '${userId}')
  ;
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(data)
      const result = {
        recipes: data
      }
      return res.status(200).json(result)
    }
  })
})

// GET ALL RECIPES WITH PAGINATION (LIMIT AND OFFSET)
app.get("/:userId/getfavouriterecipes/:limit/:offset", (req, res) => {
  const userId = req.params.userId
  var query = `
    select count(1) as count 
    from recipeservice.tbl_recipe recipe, recipeservice.tbl_recipe_image image 
    where recipe.id = image.recipeId
    and recipe.id in 
    (select fav.recipeId from recipeservice.tbl_favourites fav where fav.userId = '${userId}');
    
    select recipe.*, image.srcPath as srcpath
    from recipeservice.tbl_recipe recipe, recipeservice.tbl_recipe_image image
    where recipe.id = image.recipeId 
    and recipe.id in 
      (select fav.recipeId from recipeservice.tbl_favourites fav where fav.userId = '${userId}')
    limit ${req.params.limit} offset ${req.params.offset};
  `
  db.query(query, (err, data)=> {
    if (err) {
      return res.status(400).json(err)
    } else {
      if(JSON.stringify(data) == undefined){
        return res.status(400).send({
          error: "Error in getting recipes"
        });
      }
      console.log(`recipes: ${JSON.stringify(data)}`)
      const result = {
        count: data[0][0]["count"],
        recipes: data[1]
      }
      return res.status(200).json(result);
    }
  })
})

////////////////////////////////////////////////////
// COMMENT FUNCTIONS
////////////////////////////////////////////////////
app.post('/:recipeId/postcomment', (req, res) => {
  const recipeId = req.params.recipeId
  if (JSON.stringify(req.body) == "{}") {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body)
  const comment = {
    content: `'${req.body.content}'`,
    author: `'${req.body.author}'`,
    recipeId: `'${recipeId}'`
  }

  var query = `
  INSERT INTO recipeservice.tbl_comments
  (content, author, recipeId)
  VALUES(${comment.content}, ${comment.author}, ${comment.recipeId});
  `
  console.log(query);
  db.query(query, (err, data)=> {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(data)
      return res.send({
        message: `Comment posted successfully!`
      });
    }
  })
})

app.get('/:recipeId/getcomments/:startIndex/:limit', (req, res) => {
  const recipeId = req.params.recipeId
  const startIndex = req.params.startIndex
  const limit = req.params.limit

  var query = `
  SELECT id, content, author, recipeId, date_format(createdAt,'%d/%m/%Y') as createdAt, date_format(updatedAt,'%d/%m/%Y') as updatedAt 
  FROM recipeservice.tbl_comments WHERE recipeId = ${recipeId} order by createdAt desc
  limit ${startIndex}, ${limit};
  `
  console.log(query)
  db.query(query, (err, data) => {
    if (err) {
      return res.status(400).json(err)
    } else {
      console.log(data)
      const result = {
        comments: data
      }
      return res.status(200).json(result)
    }
  })
})

////////////////////////////////////////////////////
// INITIALISE SERVER
////////////////////////////////////////////////////
app.listen(4003, () => {
  console.log("Listening on 4003");
});
