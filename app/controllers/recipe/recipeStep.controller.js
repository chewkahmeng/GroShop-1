const db = require("../../models")
const Recipe = db.recipes
const RecipeStep = db.recipeSteps;


exports.addStep = async (req, res) => {
    console.log(req.body)
    const recipeId = req.params.id
    const recipeStep = {
        description: req.body.description,
        recipeId: recipeId
    };

    const existingRecipe = await Recipe.findByPk(recipeId)
    if (existingRecipe) {
        RecipeStep.create(recipeStep)
        .then(data => {
            req.flash('success', 'Step added successfully.')
            res.redirect(`/admin/recipes/${recipeId}/steps`)
        }).catch(err => {
            console.log(err)
            req.flash('error', 'Error occurred in adding step.')
            res.redirect(`/admin/recipes/${recipeId}/steps`)
        });
    } else {
        req.flash('error', 'Recipe cannot be found when adding step.')
        res.redirect(`/admin/recipes/${recipeId}/steps`)
    }
}

exports.updateStep = async (req, res) => {
    console.log(req.body)
    const recipeId = req.params.id
    const recipeStep = {
        description: req.body.description,
        recipeId: recipeId
    };

    const existingRecipe = await Recipe.findByPk(recipeId)
    if (existingRecipe) {
        RecipeStep.update({
            order: recipeStep.order, description: recipeStep.description, recipeId: recipeStep.recipeId
        }, {
            where: {id: req.params.stepId}
        })
        .then(data => {
            req.flash('success', 'Step updated successfully.')
            res.redirect(`/admin/recipes/${recipeId}/steps`)

        }).catch(err => {
            console.log(err)
            req.flash('error', 'Error occurred in updating step.')
            res.redirect(`/admin/recipes/${recipeId}/steps`)
        });
    } else {
        req.flash('error', 'Recipe cannot be found when updating step.')
        res.redirect(`/admin/recipes/${recipeId}/steps`)
    }
}

exports.deleteStep = async (req, res) => {
    console.log(req.body)
    const stepId = req.params.stepId
    const recipeId = req.params.id

    const existingRecipe = await Recipe.findByPk(recipeId)
    if (existingRecipe) {
        RecipeStep.destroy({where: {id: stepId}})
        .then(data => {
            req.flash('success', 'Step deleted successfully.')
            res.redirect(`/admin/recipes/${recipeId}/steps`)
        }).catch(err => {
            console.log(err)
            req.flash('error', 'Error occurred in deleting step.')
            res.redirect(`/admin/recipes/${recipeId}/steps`)
        });
    } else {
        req.flash('error', 'Recipe cannot be found when deleting step.')
        res.redirect(`/admin/recipes/${recipeId}/steps`)
    }
}

exports.getAllSteps = async (req, res) => {
    const recipeId = req.params.id
    const steps = await RecipeStep.findAll({
        where: {recipeId: recipeId},
        order: [['createdAt','ASC']]
    })
    if (steps) {
        res.render('./admin/recipe/recipeStepForm', {
            employee: req.user,
            recipeId: recipeId,
            steps: steps
        })
    } else {
        req.flash('error', 'No steps added yet.')
        res.render('./admin/recipe/recipeStepForm', {
            employee: req.user,
            recipeId: recipeId,
            steps: null
        })
    }
}

