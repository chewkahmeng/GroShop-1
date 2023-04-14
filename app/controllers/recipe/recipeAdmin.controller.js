const db = require("../../models")
const Recipe = db.recipes
const RecipeImage = db.recipeImages;
const RecipeIngredient = db.recipeIngredients;
const RecipeStep = db.recipeSteps;


const getPagination = (page, size, itemsPerPage) => {
    if (page < 0) page = 0
    const limit = size ? +size : itemsPerPage; // set limit of items per page
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const prevPage = (+page - 1) >= 0 ? (+page - 1) : null;
    const nextPage = (+page + 1) <= totalPages ? (+page + 1) : null;

    return { totalItems, items, totalPages, currentPage, prevPage, nextPage };
};

const RECIPES_PER_PAGE = 12

exports.getRecipeHome = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(+page - 1, size, RECIPES_PER_PAGE);

    Recipe.findAndCountAll({
        include: [{ model: RecipeImage}],
        limit, offset
      })
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.render('./admin/recipe/recipe', {
            employee: req.user,
            recipes: response.items,
            pageObj: {
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                nextPage: response.nextPage,
                prevPage: response.prevPage
            }
        })
    })
    .catch(err => {
        req.flash("info", "Error in retrieving recipes.")
        res.render('./admin/recipe/recipe', {
            user: req.user,
            recipes: null,
            pageObj: null
        })
    });
}


// Enter Recipe Details
exports.createRecipe = (req, res) => {
    console.log(req.body)

    const recipe = {
        name: req.body.name,
        description: req.body.description ? req.body.description : null,
        cuisine: req.body.cuisine ? req.body.cuisine : null,
        prepTime: req.body.prepTime ? req.body.prepTime : null,
        prepTimeUom: req.body.prepTimeUom ? req.body.prepTimeUom : null,
        difficulty: req.body.difficulty ? req.body.difficulty : null,
    };

    Recipe.create(recipe)
    .then(recipe => {
        req.flash('success', 'Recipe created successfully.')
        res.redirect(`/admin/recipes/${recipe.id}/uploadPhoto`)
    }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in creating recipe.')
        res.redirect(`/admin/recipes/create`)
    });
}

exports.getUploadedPhoto = async (req, res) => {
    const recipeId = req.params.id
    const recipe = await Recipe.findByPk(recipeId)
    var image;
    if (recipe) {
        image = await RecipeImage.findByPk(recipe.imageId)
    } else {
        req.flash('info', 'Please add photo.')
    }
    res.render('./admin/recipe/recipeImageForm', {
      employee: req.user,
      recipeId: req.params.id,
      image: image ? image : null
    })
}

exports.uploadPhoto = async (req, res) => {
    try {
      console.log(req.file)
      const recipeId = req.params.id
  
      if (req.file == undefined) {
        req.flash('error', 'You must select a file.')
        return res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
      }
      RecipeImage.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        srcPath: "/images/uploads/" + req.file.filename
      }).then((image) => {
        res.render('./admin/recipe/recipeImageForm', {
            employee: req.user,
            recipeId: recipeId,
            image: image
          })
      }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in creating recipe image:' + err)
        res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
    }); 
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
};

exports.addPhotoToRecipe = (req, res) => {
    console.log(req.body)
    const imageId = req.body.imageId
    if (req.body.imageId == null) {
        req.flash('error', 'Please add a photo before continuing.')
        res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
    }
    const recipeId = req.params.id
    
    Recipe.update(
        { imageId: imageId }, 
        {where: { id: recipeId }}
    ).then(recipe => {
        req.flash('success', 'Photo added to recipe successfully.')
        res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in adding photo to recipe.')
        res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
    });
}

exports.getRecipe = async (req, res) => {
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
        res.render('./admin/recipe/recipeViewPage', {
            employee: req.user,
            recipe: recipe,
            image: image,
            ingredients: ingredients,
            steps: steps
          })
    } else {
        req.flash('error', 'Error occurred in retrieving recipe.')
        res.redirect(`/admin/recipes`)
    }
}

exports.getRecipeForUpdate = async (req, res) => {
    const recipeId = req.params.id
    const recipe = await Recipe.findByPk(recipeId)
    if (recipe) {
        res.render('./admin/recipe/recipeForm', {
            employee: req.user,
            recipe: recipe,
            mode: "UPDATE"
          })
    } else {
        req.flash('error', 'Error occurred in retrieving recipe (getRecipeForUpdate).')
        res.redirect(`/admin/recipes`)
    }
}

exports.updateRecipe = async (req, res) => {
    console.log("in update recipe")
    console.log(req.body)
    const recipe = {
        name: req.body.name,
        cuisine: req.body.cuisine,
        prepTime: req.body.prepTime,
        prepTimeUom: req.body.prepTimeUom,
        description: req.body.description ? req.body.description : null,
        difficulty: req.body.difficulty
    }
    const recipeId = req.params.id
    const recipeInDB = await Recipe.findByPk(recipeId)
    if (recipeInDB) {
        Recipe.update(
            { 
                name: recipe.name,
                cuisine: recipe.cuisine,
                prepTime: recipe.prepTime,
                prepTimeUom: recipe.prepTimeUom,
                description: recipe.description,
                difficulty: recipe.difficulty
            }, 
            { where: { id: recipeId } }
        ).then(data => {
            req.flash('success', 'Recipe details updated successfully.')
            res.redirect(`/admin/recipes/${recipeId}/uploadPhoto`)
        }).catch(err => {
            console.log(err)
            req.flash('error', 'Error occurred in updating recipe details.')
            res.redirect(`/admin/recipes/${recipeId}`)
        });
    } else {
        req.flash('error', 'Error occurred in retrieving recipe (updateRecipe).')
        res.redirect(`/admin/recipes`)
    }
}

function deleteRecipeDetails(recipeId) {
    return Recipe.destroy({where: {id: recipeId}})
}
function deleteRecipeImage(imageId) {
    return RecipeImage.destroy({where: {id: imageId}})
}
function deleteRecipeIngredients(recipeId) {
    return RecipeIngredient.destroy({where: {recipeId: recipeId}})
}
function deleteRecipeSteps(recipeId) {
    return RecipeStep.destroy({where: {recipeId: recipeId}})
}

exports.deleteRecipe = async (req, res) => {
    const recipeId = req.params.id
    const recipe = await Recipe.findByPk(recipeId)
    if (recipe) {
        Promise.all([
            deleteRecipeImage(recipe.imageId),
            deleteRecipeIngredients(recipeId),
            deleteRecipeSteps(recipeId),
            deleteRecipeDetails(recipeId)
        ]).then(data => {
            req.flash('success', 'Recipe deleted successfully.')
            res.redirect(`/admin/recipes`)
        }).catch(err => {
            console.log(err)
            req.flash('error', `Error occurred in deleting recipe: ${err}`)
            res.redirect(`/admin/recipes`)
        })
    } else {
        req.flash('error', 'No recipe found.')
        res.redirect(`/admin/recipes`)
    }
}