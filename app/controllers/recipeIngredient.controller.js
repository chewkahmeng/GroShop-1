const db = require("../models")
const Recipe = db.recipes
const RecipeImage = db.recipeImages;
const RecipeIngredient = db.recipeIngredients;


exports.addIngredient = (req, res) => {
    console.log(req.body)
    const recipeId = req.params.id
    const recipeIngredient = {
        name: req.body.name,
        amount: req.body.amount,
        uom: req.body.uom,
        description: req.body.description ? req.body.description : null,
        recipeId: recipeId
    };

    RecipeIngredient.create(recipeIngredient)
    .then(data => {
        req.flash('success', 'Ingredient added successfully.')
        res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in adding ingredient.')
        res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    });
}

exports.updateIngredient = (req, res) => {
    console.log(req.body)
    const recipeId = req.params.id
    const recipeIngredient = {
        name: req.body.name,
        amount: req.body.amount,
        uom: req.body.uom,
        description: req.body.description ? req.body.description : null, 
        recipeId: recipeId
    };

    RecipeIngredient.update({
        name: recipeIngredient.name, amount: recipeIngredient.amount, uom: recipeIngredient.uom
    }, {
        where: {id: req.params.ingredientId}
    })
    .then(data => {
        req.flash('success', 'Ingredient updated successfully.')
        res.redirect(`/admin/recipes/${recipeId}/ingredients`)

    }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in updating ingredient.')
        res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    });
}

exports.deleteIngredient = (req, res) => {
    console.log(req.body)
    const ingredientId = req.params.ingredientId
    const recipeId = req.params.id

    RecipeIngredient.destroy({where: {id: ingredientId}})
    .then(data => {
        req.flash('success', 'Ingredient deleted successfully.')
        res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in deleting ingredient.')
        res.redirect(`/admin/recipes/${recipeId}/ingredients`)
    });
}

exports.getAllIngredients = async (req, res) => {
    const recipeId = req.params.id
    const ingredients = await RecipeIngredient.findAll({where: {recipeId: recipeId}})
    if (ingredients) {
        res.render('./admin/recipe/recipeIngredientForm', {
            employee: req.user,
            recipeId: recipeId,
            ingredients: ingredients
        })
    } else {
        req.flash('error', 'No ingredients added yet.')
        res.render('./admin/recipe/recipeIngredientForm', {
            employee: req.user,
            recipeId: recipeId,
            ingredients: null
        })
    }
}