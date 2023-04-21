var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const upload = require("../middleware/image.middleware.js");
const recipeController = require("../controllers/recipe/recipeAdmin.controller.js");
const recipeIngredientController = require("../controllers/recipe/recipeIngredient.controller.js");
const recipeStepController = require("../controllers/recipe/recipeStep.controller.js");

//////////////////////////////////////////////////////////////////////
// Recipe Home Page
//////////////////////////////////////////////////////////////////////
router.get("/", middleware.isLoggedIn, middleware.isAdmin, async (req, res) => {
  const url = `http://localhost:4003/getallrecipes`
  var recipes = null
  await fetch(url)
  .then(response => response.json())
  .then(data => {
    recipes = data["recipes"]
    if (recipes != null) {
      res.render('./admin/recipe/recipe', {
        recipes: recipes,
        user: req.user
      })
    } else {
      req.flash("info", "Error in retrieving recipes.")
      res.render('./admin/recipe/recipe', {
          user: req.user,
          recipes: null
      })
    }
  })
})

//////////////////////////////////////////////////////////////////////
// Create Recipe -> Enter Recipe Details
//////////////////////////////////////////////////////////////////////
router.get("/create", middleware.isLoggedIn, middleware.isAdmin,  (req, res) => {
  res.render('admin/recipe/recipeForm', {
    employee: req.user,
    mode: "CREATE"
  })
});

router.post("/create", 
  middleware.isLoggedIn, middleware.isAdmin, 
  async (req, res) => {
    const url = `http://localhost:4003/createrecipe`
    const data = {
      name: req.body.name,
      description: req.body.description ? req.body.description : null,
      cuisine: req.body.cuisine,
      prepTime: req.body.prepTime,
      prepTimeUom: req.body.prepTimeUom,
      difficulty: req.body.difficulty
    }
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    var createdRecipeId = null
    await fetch(url, fetchData)
    .then((response) => response.json())
    .then((data) =>{
      console.log("data=======> \n",data);
      createdRecipeId = data["recipe"]["insertId"]
    })
    .catch(err => {
      req.flash('error', `Error in creating recipe: ${err}`)
      res.redirect(`/admin/recipes/create`)
    })

    if ( createdRecipeId != null ) {
      const getRecipeUrl = `http://localhost:4003/${createdRecipeId}/getrecipe`
      await fetch(getRecipeUrl)
      .then(response => response.json())
      .then(data => {
        var recipe = data["recipe"]
        if (recipe != null || recipe != undefined) {
          req.flash('success', 'Recipe created successfully.')
          res.redirect(`/admin/recipes/${recipe.id}/uploadPhoto`)
        }
      }).catch(err => {
        req.flash('error', `Error in accessing newly created recipe: ${err}`)
        res.redirect(`/admin/recipes/create`)
      })
    } else {
      req.flash('error', `Error in creating recipe`)
      res.redirect(`/admin/recipes/create`)
    }
})

//////////////////////////////////////////////////////////////////////
// Create Recipe -> Upload Photo of Dish
//////////////////////////////////////////////////////////////////////
router.get("/:id/uploadPhoto", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const url = `http://localhost:4003/${recipeId}/getphotobyrecipe`
    var image = null
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("data: ", data)
      image = data["image"]
      console.log(`image: ${image}`)
      if (image == null || image == undefined || image == "") {
        image = null
        req.flash('info', 'Please add photo.')
      } 
      res.render('./admin/recipe/recipeImageForm', {
        recipeId: req.params.id,
        image: image ? image : null
      })
    }).catch(err => {
      req.flash('error', 'Error occurred in accessing recipe photo service.')
      res.redirect(`/admin/recipes/create`)
    })
  }
)
router.post("/:id/uploadPhoto", 
  middleware.isLoggedIn, middleware.isAdmin,  upload.single('image'), 
  async (req, res) => {
    console.log(req.file)
    const recipeId = req.params.id

    if (req.file == undefined) {
      req.flash('error', 'You must select a file.')
      return res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
    }

    const url = `http://localhost:4003/${recipeId}/uploadphoto`
    const data = {
      type: req.file.mimetype,
      name: req.file.originalname,
      srcPath: "/images/uploads/" + req.file.filename
    }
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    var createdImageId = null
    await fetch(url, fetchData)
    .then((response) => response.json())
    .then((data) =>{
      console.log("data=======> \n",data);
      createdImageId = data["image"]["insertId"]
    })
    .catch(err => {
      req.flash('error', `Error occurred in creating recipe image: ${err}`)
      res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
    })

    if ( createdImageId != null ) {
      const photourl = `http://localhost:4003/getphotobyid/${createdImageId}`
      var image = null
      await fetch(photourl)
      .then(response => response.json())
      .then(data => {
        image = data["image"][0]
        console.log(image)
        if (image == null || image == undefined) {
          req.flash('info', 'Please add photo.')
        } else {
          req.flash('success', `Photo uploaded successfully!`)
        }
        res.render('./admin/recipe/recipeImageForm', {
          recipeId: req.params.id,
          image: image ? image : null
        })
      }).catch(err => {
        req.flash('error', 'Error occurred in accessing recipe photo service.')
        res.redirect(`/admin/recipes/create`)
      })
    } else {
      req.flash('error', `No image uploaded: ${err}`)
      res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
    }
  }
)

router.post("/:id/savePhoto", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const url = `http://localhost:4003/${recipeId}/savephototorecipe`
    const data = {
      imageId: req.body.imageId
    }
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    await fetch(url, fetchData)
    .then((response) => response.json())
    .then((data) =>{
      console.log("data=======> \n",data);
      req.flash('success', 'Photo added to recipe successfully.')
      res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    })
    .catch(err => {
      console.log(err)
      req.flash('error', 'Error occurred in adding photo to recipe.')
      res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
    })
  }
)

//////////////////////////////////////////////////////////////////////
// Create Recipe -> Enter Recipe Ingredients
//////////////////////////////////////////////////////////////////////
router.get("/:id/ingredients", middleware.isLoggedIn, middleware.isAdmin,  recipeIngredientController.getAllIngredients)
router.post("/:id/ingredients/add", middleware.isLoggedIn, middleware.isAdmin,  recipeIngredientController.addIngredient)
router.post("/:id/ingredients/:ingredientId/update", middleware.isLoggedIn, middleware.isAdmin,  recipeIngredientController.updateIngredient)
router.post("/:id/ingredients/:ingredientId/delete", middleware.isLoggedIn, middleware.isAdmin,  recipeIngredientController.deleteIngredient)

//////////////////////////////////////////////////////////////////////
// Create Recipe -> Enter Recipe Steps
//////////////////////////////////////////////////////////////////////
router.get("/:id/steps", middleware.isLoggedIn, middleware.isAdmin,  recipeStepController.getAllSteps)
router.post("/:id/steps/add", middleware.isLoggedIn, middleware.isAdmin,  recipeStepController.addStep)
router.post("/:id/steps/:stepId/update", middleware.isLoggedIn, middleware.isAdmin,  recipeStepController.updateStep)
router.post("/:id/steps/:stepId/delete", middleware.isLoggedIn, middleware.isAdmin,  recipeStepController.deleteStep)

//////////////////////////////////////////////////////////////////////
// View Recipe
//////////////////////////////////////////////////////////////////////
router.get("/:id", middleware.isLoggedIn, middleware.isAdmin,  recipeController.getRecipe)

//////////////////////////////////////////////////////////////////////
// Update Recipe
//////////////////////////////////////////////////////////////////////
router.get("/:id/update", middleware.isLoggedIn, middleware.isAdmin,  recipeController.getRecipeForUpdate)
router.post("/:id/update", middleware.isLoggedIn, middleware.isAdmin,  recipeController.updateRecipe)

//////////////////////////////////////////////////////////////////////
// Delete Recipe
//////////////////////////////////////////////////////////////////////
router.post("/:id/delete", middleware.isLoggedIn, middleware.isAdmin,  recipeController.deleteRecipe)

module.exports = router