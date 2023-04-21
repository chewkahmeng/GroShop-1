var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const upload = require("../middleware/image.middleware.js");
const recipeController = require("../controllers/recipe/recipeUser.controller.js");
const recipeIngredientController = require("../controllers/recipe/recipeIngredient.controller.js");
const recipeStepController = require("../controllers/recipe/recipeStep.controller.js");

const { check, validationResult } = require('express-validator')

// Recipe Home Page
router.get("/", 
    middleware.isLoggedIn, 
    async (req, res) => {
        const url = `http://localhost:4003/getallrecipes`
        var recipes = null
        await fetch(url)
        .then(response => response.json())
        .then(data => {
          recipes = data["recipes"]
          if (recipes != null) {
            res.render('./user/recipe/recipe', {
              recipes: recipes,
              user: req.user
            })
          } else {
            req.flash("info", "Error in retrieving recipes.")
            res.render('./user/recipe/recipe', {
                user: req.user,
                recipes: null
            })
          }
        })
    }
)

// Favourite Recipes Page
router.get("/favourites", 
    middleware.isLoggedIn, 
    async (req, res) => {
        const userId = req.user.id
        const url = `http://localhost:4003/${userId}/getfavouriterecipes`
        var recipes = null
        await fetch(url)
        .then(response => response.json())
        .then(data => {
          recipes = data["recipes"]
          if (recipes != null) {
            res.render('./user/recipe/favourites', {
              recipes: recipes,
              user: req.user
            })
          } else {
            req.flash("info", "No favourite recipes added.")
            res.render('./user/recipe/favourites', {
                user: req.user,
                recipes: null
            })
          }
        })
    }
)

// View Recipe
router.get("/:id", 
    middleware.isLoggedIn, 
    async (req, res) => {
        var recipe = null
        var image = null
        var ingredients = null
        var steps = null
        var favourite = null
        var comments = null
    
        const recipeId = req.params.id
        const userId = req.user.id
        const url = `http://localhost:4003/${userId}/getrecipedetailsforuser/${recipeId}`
        await fetch(url)
        .then ((response) => response.json())
        .then((data => {
            recipe = data["recipe"]
            image = data["image"]
            ingredients = data["ingredients"]
            steps = data["steps"]
            favourite = data["favourite"]
            comments = data["comments"]
            console.log(`view recipe by user: ${data}`)
            if (recipe == null || recipe == undefined) {
                req.flash('error', 'Cannot retrieve recipe.')
                recipe = null
                image = null
                ingredients = null
                steps = null
                favourite = null
                comments = null
            }
            res.render('./user/recipe/recipeViewPage', {
                recipe: recipe,
                image: image,
                ingredients: ingredients,
                steps: steps,
                favourite: favourite,
                comments: comments
            })
        }))
        .catch(err => {
          console.log(err)
          req.flash('error', `Error occurred in retrieving recipe: ${err}`)
          res.redirect(`/home/recipes`)
        })
      }
)

// Favourite Recipe
router.post("/:id/favourite", 
    middleware.isLoggedIn, 
    async (req, res) => {
        userId = req.user.id
        recipeId = req.params.id
        const url = `http://localhost:4003/${userId}/favouriterecipe/${recipeId}`
        let fetchData = {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        await fetch(url, fetchData)
        .then(response => response.json())
        .then((data) =>{
            console.log("data=======> \n",data);
            req.flash('success', 'Recipe added to favourites!')
            res.redirect(`/home/recipes/${recipeId}`)
        })
        .catch(err => {
            console.log(err)
            req.flash('error', `Error in favouriting recipe: ${err}`)
            res.redirect(`/home/recipes/${recipeId}`)
        })
    }
)

// Unfavourite Recipe
router.post("/:id/unfavourite", 
    middleware.isLoggedIn, 
    async (req, res) => {
        userId = req.user.id
        recipeId = req.params.id
        const url = `http://localhost:4003/${userId}/unfavouriterecipe/${recipeId}`
        let fetchData = {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        await fetch(url, fetchData)
        .then(response => response.json())
        .then((data) =>{
            console.log("data=======> \n",data);
            req.flash('success', 'Recipe removed from favourites!')
            res.redirect(`/home/recipes/${recipeId}`)
        })
        .catch(err => {
            console.log(err)
            req.flash('error', `Error in unfavouriting recipe: ${err}`)
            res.redirect(`/home/recipes/${recipeId}`)
        })
    }
)

// Comment on Recipe
router.post("/:id/comment", 
    middleware.isLoggedIn, 
    async (req, res) => {
        userId = req.user.id
        recipeId = req.params.id
        const url = `http://localhost:4003/${recipeId}/postcomment`
        
        const data = {
            content: req.body.content,
            author: req.user.username
        };
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        await fetch(url, fetchData)
        .then(response => response.json())
        .then((data) =>{
            console.log("data=======> \n",data);
            req.flash('success', 'Comment posted!')
            res.redirect(`/home/recipes/${recipeId}`)
        })
        .catch(err => {
            console.log(err)
            req.flash('error', 'Error in posting comment.')
            res.redirect(`/home/recipes/${recipeId}`)
        })
    }
)




module.exports = router