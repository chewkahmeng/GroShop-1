var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const upload = require("../middleware/image.middleware.js");
const recipeController = require("../controllers/recipe/recipeAdmin.controller.js");
const recipeIngredientController = require("../controllers/recipe/recipeIngredient.controller.js");
const recipeStepController = require("../controllers/recipe/recipeStep.controller.js");


// Recipe Home Page
router.get("/", middleware.isLoggedIn, recipeController.getRecipeHome)


// Create Recipe -> Enter Recipe Details
router.get("/create", middleware.isLoggedIn, (req, res) => {
  res.render('admin/recipe/recipeForm', {
    employee: req.user,
    mode: "CREATE"
  })
});
router.post("/create", middleware.isLoggedIn, recipeController.createRecipe)

// Create Recipe -> Upload Photo of Dish
router.get("/:id/uploadPhoto", middleware.isLoggedIn, recipeController.getUploadedPhoto)

router.post("/:id/uploadPhoto", middleware.isLoggedIn, upload.single('image'), recipeController.uploadPhoto)
router.post("/:id/savePhoto", middleware.isLoggedIn, recipeController.addPhotoToRecipe)

// Create Recipe -> Enter Recipe Ingredients
router.get("/:id/ingredients", middleware.isLoggedIn, recipeIngredientController.getAllIngredients)

router.post("/:id/ingredients/add", middleware.isLoggedIn, recipeIngredientController.addIngredient)
router.post("/:id/ingredients/:ingredientId/update", middleware.isLoggedIn, recipeIngredientController.updateIngredient)
router.post("/:id/ingredients/:ingredientId/delete", middleware.isLoggedIn, recipeIngredientController.deleteIngredient)

// Create Recipe -> Enter Recipe Steps
router.get("/:id/steps", middleware.isLoggedIn, recipeStepController.getAllSteps)
router.post("/:id/steps/add", middleware.isLoggedIn, recipeStepController.addStep)
router.post("/:id/steps/:stepId/update", middleware.isLoggedIn, recipeStepController.updateStep)
router.post("/:id/steps/:stepId/delete", middleware.isLoggedIn, recipeStepController.deleteStep)

// View Recipe
router.get("/:id", middleware.isLoggedIn, recipeController.getRecipe)

// Update Recipe
router.get("/:id/update", middleware.isLoggedIn, recipeController.getRecipeForUpdate)
router.post("/:id/update", middleware.isLoggedIn, recipeController.updateRecipe)

// Delete Recipe
router.post("/:id/delete", middleware.isLoggedIn, recipeController.deleteRecipe)

module.exports = router