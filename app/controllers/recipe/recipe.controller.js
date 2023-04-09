const db = require("../../models")
const Recipe = db.recipes
const RecipeImage = db.recipeImages;
const RecipeIngredient = db.RecipeIngredient;

// Enter Recipe Details
exports.createRecipe = (req, res) => {
    console.log(req.body)

    const recipe = {
        name: req.body.name,
        description: req.body.description ? req.body.description : null,
        cuisine: req.body.cuisine ? req.body.cuisine : null,
        prepTime: req.body.prepTime ? req.body.prepTime : null,
        prepTimeUom: req.body.prepTimeUom ? req.body.prepTimeUom : null,
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
