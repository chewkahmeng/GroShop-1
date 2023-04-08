var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const upload = require("../middleware/image.middleware.js");
const recipeController = require("../controllers/recipe.controller.js");
const { check, validationResult } = require('express-validator')

// Recipe Home Page
router.get("/", middleware.isLoggedIn, 
(req, res) => res.render('admin/recipe/recipe', {
    employee: req.user
}));

// Create Recipe -> Enter Recipe Details
router.get("/create", middleware.isLoggedIn, (req, res) => {
    res.render('admin/recipe/recipeForm', {
    employee: req.user,
    mode: "CREATE"
  })
});
router.post("/create", middleware.isLoggedIn, recipeController.createRecipe)

// Create Recipe -> Upload Photo of Dish
router.get("/:id/uploadPhoto", middleware.isLoggedIn, (req, res) => {
  res.render('./admin/recipe/recipeImageForm', {
    employee: req.user,
    recipeId: req.params.id
  })
})
router.post("/:id/uploadPhoto", middleware.isLoggedIn, upload.single('image'), recipeController.uploadPhoto)
router.post("/:id/savePhoto", middleware.isLoggedIn, recipeController.addPhotoToRecipe)

// Create Recipe -> Enter Recipe Ingredients
router.get("/:id/addIngredients", middleware.isLoggedIn, (req, res) => {
    res.render('./admin/recipe/recipeIngredientForm', {
      employee: req.user,
      recipeId: req.params.id
    })
  })
router.post("/:id/addIngredients", middleware.isLoggedIn, recipeController.createRecipeIngredients)

// Create Recipe -> Enter Recipe Steps
router.get("/:id/addSteps", middleware.isLoggedIn, (req, res) => {
    res.render('./admin/recipe/recipeStepForm', {
      employee: req.user,
      recipeId: req.params.id
    })
  })
router.post("/:id/addSteps", middleware.isLoggedIn, recipeController.createRecipeSteps)

module.exports = router