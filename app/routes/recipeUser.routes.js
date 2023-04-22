var router = require("express").Router();
const middleware = require("../middleware/middleware.js")

const getPagination = (page, size, itemsPerPage) => {
    if (page < 0) page = 0
    const limit = size ? +size : itemsPerPage; // set limit of items per page
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (count, items, page, limit) => {
    page = page ? page : 1
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(count / limit);
    const prevPage = (currentPage - 1) >= 0 ? (currentPage - 1) : null;
    const nextPage = (currentPage + 1) <= totalPages ? (currentPage + 1) : null;
    console.log(`page: ${page}`)
    return { count, items, totalPages, currentPage, prevPage, nextPage };
};

const RECIPES_PER_PAGE = 6 // will change to 12
const COMMENTS_PER_PAGE = 5

// Recipe Home Page
router.get("/", 
    middleware.isLoggedIn, 
    async (req, res) => {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(+page - 1, size, RECIPES_PER_PAGE);
        
        var recipes = null

        // const url = `http://localhost:4003/getallrecipes`
        const url = `http://localhost:4003/getallrecipes/${limit}/${offset}`
        await fetch(url)
        .then(response => response.json())
        .then(data => {
          const response = getPagingData(data["count"], data["recipes"], page, limit);
          console.log(`response: ${JSON.stringify(response)}`)
          recipes = data["recipes"]
          if (recipes != null) {
            res.render('./user/recipe/recipe', {
                user: req.user,
                recipes: recipes,
                pageObj: {
                    currentPage: response.currentPage,
                    totalPages: response.totalPages,
                    nextPage: response.nextPage,
                    prevPage: response.prevPage
                }
            })
          } else {
            req.flash("info", "Error in retrieving recipes.")
            res.render('./user/recipe/recipe', {
                user: req.user,
                recipes: null,
                pageObj: null
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
        // var comments = null
    
        const recipeId = req.params.id
        const userId = req.user ? req.user.id : null
        const url = `http://localhost:4003/${userId}/getrecipedetailsforuser/${recipeId}`
        await fetch(url)
        .then ((response) => response.json())
        .then((data => {
            recipe = data["recipe"]
            image = data["image"]
            ingredients = data["ingredients"]
            steps = data["steps"]
            favourite = data["favourite"]
            // comments = data["comments"]
            console.log(`view recipe by user: ${data}`)
            if (recipe == null || recipe == undefined) {
                req.flash('error', 'Cannot retrieve recipe.')
                recipe = null
                image = null
                ingredients = null
                steps = null
                favourite = null
                // comments = null
            }
            res.render('./user/recipe/recipeViewPage', {
                recipe: recipe,
                image: image,
                ingredients: ingredients,
                steps: steps,
                favourite: favourite,
                // comments: comments
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