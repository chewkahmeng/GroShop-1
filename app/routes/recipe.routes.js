var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const upload = require("../middleware/image.middleware.js");
const recipeController = require("../controllers/recipe.controller.js");
const recipeIngredientController = require("../controllers/recipeIngredient.controller.js");
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
router.get("/:id/ingredients", middleware.isLoggedIn, recipeIngredientController.getAllIngredients)

router.post("/:id/ingredients/add", middleware.isLoggedIn, recipeIngredientController.addIngredient)
router.post("/:id/ingredients/:ingredientId/update", middleware.isLoggedIn, recipeIngredientController.updateIngredient)
router.post("/:id/ingredients/:ingredientId/delete", middleware.isLoggedIn, recipeIngredientController.deleteIngredient)

// Create Recipe -> Enter Recipe Steps
router.get("/:id/steps", middleware.isLoggedIn, (req, res) => {
  res.render('./admin/recipe/recipeStepForm', {
    employee: req.user,
    recipeId: req.params.id
  })
})
// router.post("/:id/steps/add", middleware.isLoggedIn, recipeController.createRecipeSteps)

module.exports = router