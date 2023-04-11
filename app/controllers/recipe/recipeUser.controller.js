const db = require("../../models")
const Recipe = db.recipes
const RecipeImage = db.recipeImages;
const RecipeIngredient = db.recipeIngredients;
const RecipeStep = db.recipeSteps;


exports.getRecipeHomeForUser = async (req, res) => {
    const recipes = await Recipe.findAll({
        include: [{ model: RecipeImage}]
      });
    // console.log(JSON.stringify(recipes, null, 2));

    res.render('user/recipe/recipe', {
        user: req.user,
        recipes: recipes
    })
}

exports.getRecipeForUser = async (req, res) => {
    const recipeId = req.params.id
    const recipe = await Recipe.findByPk(recipeId)
    if (recipe) {
        const image = await RecipeImage.findByPk(recipe.imageId)
        if (image == null) {
            req.flash('error', 'Error occurred in retrieving recipe photo.')
        }
        const ingredients = await RecipeIngredient.findAll({where: { recipeId: recipeId }})
        if (ingredients == null) {
            req.flash('error', 'Error occurred in retrieving recipe ingredients.')
        }
        const steps = await RecipeStep.findAll({
            where: {recipeId: recipeId},
            order: [['createdAt','ASC']]
        })
        if (steps == null) {
            req.flash('error', 'Error occurred in retrieving recipe steps.')
        }
        res.render('./user/recipe/recipeViewPage', {
            user: req.user,
            recipe: recipe,
            image: image,
            ingredients: ingredients,
            steps: steps
          })
    } else {
        req.flash('error', 'Error occurred in retrieving recipe.')
        res.redirect(`/user/recipes`)
    }
}


