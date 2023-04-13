const db = require("../../models")
const { Op } = require("sequelize");
const Recipe = db.recipes
const RecipeImage = db.recipeImages;
const RecipeIngredient = db.recipeIngredients;
const RecipeStep = db.recipeSteps;
const Favourites = db.favourites;
const Comment = db.comments;


const getPagination = (page, size) => {
    if (page < 0) page = 0
    const limit = size ? +size : 2; // set limit of items per page
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: recipes } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const prevPage = (+page - 1) >= 0 ? (+page - 1) : null;
    const nextPage = (+page + 1) <= totalPages ? (+page + 1) : null;

    return { totalItems, recipes, totalPages, currentPage, prevPage, nextPage };
};

exports.getRecipeHomeForUser = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(+page - 1, size);

    Recipe.findAndCountAll({
        include: [{ model: RecipeImage}],
        limit, offset
      })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.render('./user/recipe/recipe', {
            user: req.user,
            recipes: response.recipes,
            pageObj: {
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                nextPage: response.nextPage,
                prevPage: response.prevPage
            }
        })
    })
    .catch(err => {
        res.render('./user/recipe/recipe', {
            user: req.user,
            recipes: null,
            pageObj: null
        })
    });


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
        console.log(comments)
        console.log(comments.length)

        res.render('./user/recipe/recipeViewPage', {
            user: req.user,
            recipe: recipe,
            image: image,
            ingredients: ingredients,
            steps: steps,
            favourite: favourite ? favourite : null,
            comments: comments.length > 0 ? comments : null
        })
    } else {
        req.flash('error', 'Error occurred in retrieving recipe.')
        res.redirect(`/home/recipes`)
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
            res.redirect(`/home/recipes/${recipeId}`)
        }).catch(err => {
            console.log(err)
            req.flash('error', 'Error in posting comment.')
            res.redirect(`/home/recipes/${recipeId}`)
        })
    } else {
        req.flash('error', 'Error in retrieving recipe to comment.')
        res.redirect(`/home/recipes/${recipeId}`)
    }
}

exports.getFavouriteRecipesForUser = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(+page - 1, size);
    console.log(req.user.id)
    Recipe.findAndCountAll({
        include: [{ model: RecipeImage}, {model: Favourites, where: {
            userId: {[Op.eq]: req.user.id}
        }}],
        limit, offset
      })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.render('./user/recipe/favourites', {
            user: req.user,
            recipes: response.recipes.length > 0 ? response.recipes : null,
            pageObj: {
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                nextPage: response.nextPage,
                prevPage: response.prevPage
            }
        })
    })
    .catch(err => {
        res.render('./user/recipe/favourites', {
            user: req.user,
            recipes: null,
            pageObj: null
        })
    });
}
