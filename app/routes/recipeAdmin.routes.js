var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const upload = require("../middleware/image.middleware.js");

const getPagination = (page, size, itemsPerPage) => {
    if (page < 0) page = 0
    const limit = size ? +size : itemsPerPage; // set limit of items per page
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (count, items, page, limit) => {
    page = page ? page : 1
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(count / limit);
    const prevPage = (currentPage - 1) >= 0 ? (currentPage - 1) : null;
    const nextPage = (currentPage + 1) <= totalPages ? (currentPage + 1) : null;
    console.log(`page: ${page}`)
    return { count, items, totalPages, currentPage, prevPage, nextPage };
};

const RECIPES_PER_PAGE = 6 // will change to 12
const COMMENTS_PER_PAGE = 5

//////////////////////////////////////////////////////////////////////
// Recipe Home Page
//////////////////////////////////////////////////////////////////////
router.get("/", 
  middleware.isLoggedIn, middleware.isAdmin, 
  async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(+page - 1, size, RECIPES_PER_PAGE);

    var recipes = null
    
    // const url = `http://localhost:4003/getallrecipes`
    const url = `http://localhost:4003/getallrecipes/${limit}/${offset}`
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      const response = getPagingData(data["count"], data["recipes"], page, limit);
      console.log(`response: ${JSON.stringify(response)}`)
      recipes = data["recipes"]
      if (recipes != null) {
        res.render('./admin/recipe/recipe', {
          recipes: recipes,
          user: req.user,
          pageObj: {
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            nextPage: response.nextPage,
            prevPage: response.prevPage
          }
        })
      } else {
        req.flash("info", "Error in retrieving recipes.")
        res.render('./admin/recipe/recipe', {
          user: req.user,
          recipes: null,
          pageObj: null
        })
      }
    })
  }
)

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
        if (recipe != null && recipe != undefined) {
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
// GET UPLOADED PHOTO
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
      image = data["image"][0]
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

// UPLOAD AND CREATE RECIPE IMAGE RECORD
router.post("/:id/uploadPhoto", 
  middleware.isLoggedIn, middleware.isAdmin,  upload.single('image'), 
  async (req, res) => {
    console.log(req.file)
    const recipeId = req.params.id

    if (req.file == undefined) {
      req.flash('error', 'You must select a file.')
      return res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
    }

    // UPLOAD PHOTO
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

    // GET THE NEWLY UPLOADED PHOTO
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
      const photourl = `http://localhost:4003/${createdImageId}/getphotobyid`
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

// SAVE PHOTO TO RECIPE
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
// GET RECIPE INGREDIENTS
router.get("/:id/ingredients", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const url = `http://localhost:4003/${recipeId}/getallingredients`
    var ingredients = null
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      ingredients = data["ingredients"]
      console.log("data=======> ", ingredients)
      if (ingredients == null || ingredients == undefined  || ingredients[0] == null) {
        req.flash('info', 'Please add ingredients.')
        ingredients = null
      }
      res.render('./admin/recipe/recipeIngredientForm', {
        recipeId: recipeId,
        ingredients: ingredients
      })
    })
    .catch(err => {
      req.flash('info', `Error in accessing recipe ingredients.: ${err}`)
      res.render('./admin/recipe/recipeIngredientForm', {
        recipeId: recipeId,
        ingredients: null
      })
    })
  }
)

// ADD RECIPE INGREDIENT
router.post("/:id/ingredients/add", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const url = `http://localhost:4003/${recipeId}/addingredient`
    const data = {
      name: req.body.name,
      amount: req.body.amount,
      uom: req.body.uom,
      description: req.body.description ? req.body.description : null,
      recipeId: recipeId
    };
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
      req.flash('success', 'Ingredient added successfully.')
      res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    })
    .catch(err => {
      console.log(err)
      req.flash('error', 'Error occurred in adding ingredient.')
      res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    })
  }
)

// UPDATE RECIPE INGREDIENT
router.post("/:id/ingredients/:ingredientId/update", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const ingredientId = req.params.ingredientId
    const url = `http://localhost:4003/${recipeId}/updateingredient/${ingredientId}`
    const data = {
      name: req.body.name,
      amount: req.body.amount,
      uom: req.body.uom,
      description: req.body.description ? req.body.description : null,
      recipeId: recipeId
    };
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
      req.flash('success', 'Ingredient updated successfully.')
      res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    })
    .catch(err => {
      console.log(err)
      req.flash('error', 'Error occurred in updated ingredient.')
      res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    })
  }
)

// DELETE RECIPE INGREDIENT
router.post("/:id/ingredients/:ingredientId/delete", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const ingredientId = req.params.ingredientId
    const url = `http://localhost:4003/${recipeId}/deleteingredient/${ingredientId}`

    let fetchData = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    await fetch(url, fetchData)
    .then((response) => response.json())
    .then((data) =>{
      console.log("data=======> \n",data);
      req.flash('success', 'Ingredient deleted successfully.')
      res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    })
    .catch(err => {
      console.log(err)
      req.flash('error', 'Error occurred in deleting ingredient.')
      res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    })
  }
)

//////////////////////////////////////////////////////////////////////
// Create Recipe -> Enter Recipe Steps
//////////////////////////////////////////////////////////////////////
// GET ALL STEPS
router.get("/:id/steps", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const url = `http://localhost:4003/${recipeId}/getallsteps`
    var steps = null
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      steps = data["steps"]
      console.log("data=======> ", steps)
      if (steps == null || steps == undefined || steps[0] == null) {
        req.flash('info', 'Please add steps.')
        steps = null
      }
      res.render('./admin/recipe/recipeStepForm', {
        recipeId: recipeId,
        steps: steps
      })
    })
    .catch(err => {
      req.flash('info', `Error in accessing recipe steps.: ${err}`)
      res.render('./admin/recipe/recipeStepForm', {
        recipeId: recipeId,
        steps: null
      })
    })
  }
)
// ADD STEP
router.post("/:id/steps/add", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const url = `http://localhost:4003/${recipeId}/addstep`
    const data = {
      description: req.body.description,
      recipeId: recipeId
    };
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
      req.flash('success', 'Step added successfully.')
      res.redirect(`/admin/recipes/${recipeId}/steps`)
    })
    .catch(err => {
      console.log(err)
      req.flash('error', 'Error occurred in adding Step.')
      res.redirect(`/admin/recipes/${recipeId}/steps`)
    })
  }
)

router.post("/:id/steps/:stepId/update", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const stepId = req.params.stepId
    const url = `http://localhost:4003/${recipeId}/updatestep/${stepId}`
    const data = {
      description: req.body.description,
      recipeId: recipeId
    };
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
      req.flash('success', 'Step updated successfully.')
      res.redirect(`/admin/recipes/${recipeId}/steps`)
    })
    .catch(err => {
      console.log(err)
      req.flash('error', 'Error occurred in updating Step.')
      res.redirect(`/admin/recipes/${recipeId}/steps`)
    })
  }
)
router.post("/:id/steps/:stepId/delete", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const stepId = req.params.stepId
    const url = `http://localhost:4003/${recipeId}/deletestep/${stepId}`

    let fetchData = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    await fetch(url, fetchData)
    .then((response) => response.json())
    .then((data) =>{
      console.log("data=======> \n",data);
      req.flash('success', 'Step deleted successfully.')
      res.redirect(`/admin/recipes/${recipeId}/steps`)
    })
    .catch(err => {
      console.log(err)
      req.flash('error', 'Error occurred in deleting step.')
      res.redirect(`/admin/recipes/${recipeId}/steps`)
    })
  }
)

//////////////////////////////////////////////////////////////////////
// View Recipe
//////////////////////////////////////////////////////////////////////
router.get("/:id", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    var recipe = null
    var image = null
    var ingredients = null
    var steps = null

    const recipeId = req.params.id

    const url = `http://localhost:4003/${recipeId}/getrecipedetails`
    await fetch(url)
    .then ((response) => response.json())
    .then((data => {
      recipe = data["recipe"]
      image = data["image"]
      ingredients = data["ingredients"]
      steps = data["steps"]
      if (recipe == null || recipe == undefined) {
        req.flash('error', 'Cannot retrieve recipe.')
        recipe = null
        image = null
        ingredients = null
        steps = null
      }
      res.render('./admin/recipe/recipeViewPage', {
        recipe: recipe,
        image: image,
        ingredients: ingredients,
        steps: steps
      })
    }))
    .catch(err => {
      console.log(err)
      req.flash('error', `Error occurred in retrieving recipe: ${err}`)
      res.redirect(`/admin/recipes`)
    })
  }
)

//////////////////////////////////////////////////////////////////////
// Update Recipe
//////////////////////////////////////////////////////////////////////
router.get("/:id/update", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const url = `http://localhost:4003/${recipeId}/getrecipe`
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      var recipe = data["recipe"]
      if (recipe != null || recipe != undefined) {
        return res.render('./admin/recipe/recipeForm', {
          recipe: recipe,
          mode: "UPDATE"
        })
      } else {
        req.flash('error', 'Error occurred in retrieving recipe from recipe service')
        res.redirect(`/admin/recipes`)
      }
    }).catch(err => {
      req.flash('error', `Error occurred in retrieving recipe for update: ${err}`)
      res.redirect(`/admin/recipes`)
    })
  }
)
router.post("/:id/update", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const url = `http://localhost:4003/${recipeId}/updaterecipe`

    const data = {
      name: req.body.name,
      cuisine: req.body.cuisine,
      prepTime: req.body.prepTime,
      prepTimeUom: req.body.prepTimeUom,
      description: req.body.description ? req.body.description : null,
      difficulty: req.body.difficulty
    };
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
      req.flash('success', 'Recipe details updated successfully.')
      res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
    })
    .catch(err => {
      console.log(err)
      req.flash('error', 'Error occurred in updating recipe details.')
      res.redirect(`/admin/recipes/${recipeId}`)
    })
  }
)

//////////////////////////////////////////////////////////////////////
// Delete Recipe
//////////////////////////////////////////////////////////////////////
router.post("/:id/delete", 
  middleware.isLoggedIn, middleware.isAdmin,  
  async (req, res) => {
    const recipeId = req.params.id
    const url = `http://localhost:4003/${recipeId}/deleterecipe`

    let fetchData = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    await fetch(url, fetchData)
    .then((response) => response.json())
    .then((data) =>{
      console.log("data=======> \n",data);
      req.flash('success', 'Recipe deleted successfully.')
      res.redirect(`/admin/recipes`)
    })
    .catch(err => {
      console.log(err)
      req.flash('error', 'Error occurred in deleting recipe.')
      res.redirect(`/admin/recipes`)
    })
  }
)

module.exports = router