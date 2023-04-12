const db = require("../../models")
const Recipe = db.recipes
const RecipeImage = db.recipeImages;
const RecipeIngredient = db.recipeIngredients;
const RecipeStep = db.recipeSteps;
const Favourites = db.favourites;
const Comment = db.comments;


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
        const favourite = await Favourites.findOne({
            where: {userId: req.user.id, recipeId: recipeId}
        })
        const comments = await Comment.findAll({
            where: {recipeId: recipeId}
        })

        res.render('./user/recipe/recipeViewPage', {
            user: req.user,
            recipe: recipe,
            image: image,
            ingredients: ingredients,
            steps: steps,
            favourite: favourite ? favourite : null,
            comments: comments ? comments : null
        })
    } else {
        req.flash('error', 'Error occurred in retrieving recipe.')
        res.redirect(`/user/recipes`)
    }
}

exports.favouriteRecipe = async (req, res) => {
    const recipeId = req.params.id
    const recipe = await Recipe.findByPk(recipeId)
    if (recipe) {
        const favourite = {
            userId: req.user.id,
            recipeId: recipeId
        }
        Favourites.create(favourite)
        .then(data => {
            req.flash('success', 'Recipe added to favourites!')
            res.redirect(`/home/recipes/${recipeId}`)
        }).catch(err => {
            console.log(err)
            req.flash('error', 'Error in favouriting recipe.')
            res.redirect(`/home/recipes/${recipeId}`)
        })
    } else {
        req.flash('error', 'Error in retrieving recipe to favourite.')
        res.redirect(`/home/recipes/${recipeId}`)
    }
}

exports.unfavouriteRecipe = async (req, res) => {
    const recipeId = req.params.id
    const recipe = await Recipe.findByPk(recipeId)
    if (recipe) {
        const favourites = await Favourites.findAll({where: {userId: req.user.id, recipeId: recipeId}})
        if (favourites) {
            Favourites.destroy({where: {userId: req.user.id, recipeId: recipeId}})
            .then(data => {
                req.flash('success', 'Recipe removed from favourites!')
                res.redirect(`/home/recipes/${recipeId}`)
            }).catch(err => {
                console.log(err)
                req.flash('error', 'Error in unfavouriting recipe.')
                res.redirect(`/home/recipes/${recipeId}`)
            })
        } else {
            req.flash('error', 'Recipe was not favourited in the first place.')
            res.redirect(`/home/recipes/${recipeId}`)
        }
    } else {
        req.flash('error', 'Error in retrieving recipe to favourite.')
        res.redirect(`/home/recipes/${recipeId}`)
    }
}

exports.postComment = async (req, res) => {
    console.log(req.body)
    const recipeId = req.params.id
    const recipe = await Recipe.findByPk(recipeId)

    if (recipe) {
        const comment = {
            content: req.body.content,
            author: req.user.username,
            recipeId: recipeId
          };
        Comment.create(comment)
        .then(data => {
            req.flash('success', 'Comment posted!')
        }).catch(err => {
            console.log(err)
            req.flash('error', 'Error in posting comment.')
        })
    } else {
        req.flash('error', 'Error in retrieving recipe to comment.')
    }
}


