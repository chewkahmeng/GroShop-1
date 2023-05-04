var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const { check, validationResult } = require('express-validator')

// Cart Home Page
// Method 1: calling microservice api in cart.routes.js to fetch data 
// and then render the EJS page to be seen on browser
// See method 2 in mycart.ejs for another way to fetch data from microservice api 
/*router.get("/mycart", middleware.isLoggedIn, async (req, res) => {
    const id = 1 // some id
    const url = `http://localhost:4000/${id}/api`
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        // TODO
        
        // page is in views/users/cart/mycart.ejs
        res.render('./user/cart/mycart', {
            user: req.user,
            items: data[items]
        })
    }).catch(err => {
        // display alert error message in mycart.ejs under alert.ejs
        req.flash("error", `Error in retrieving cart: ${err}`)

        // page is in views/users/cart/mycart.ejs
        res.render('./user/cart/mycart', {
            user: req.user,
            items: null
        })
    })



})*/

router.post("/:userid/addToCart", middleware.isLoggedIn,  async (req, res) =>{
    const userId = req.params.userid
    const recipeId = req.body.recipeId
    

    const url = `http://localhost:4003/${recipeId}/getallingredientsbynameamountuom` // will be changed to url that only retrieve 3 items
    var ingredients = null
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      ingredients = data["ingredients"]
      console.log("data=======> ", ingredients)
      
     
    })

    //create cart (to pass in userId)
    const createCarturl = `` //createCartURL
    console.log("userId=======> ",userId);
    const data = {
        userId: userId,
        ingredients: ingredients
      };
      let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8'
        })
      }
      await fetch(createCarturl, fetchData)
    .then((response) => response.json())
    .then((data) =>{
      console.log("data=======> \n",data);
      req.flash('success', 'Cart Created successfully.')
    })

    
    }
)
router.post("/item/:productName/delete", middleware.isLoggedIn,  async (req, res) =>{
const cartName = req.params.productName

console.log("cartName=======> ", cartName)

}

)
router.get("/mycart", middleware.isLoggedIn, async (req, res) => {
    const id = 1 // some id
    const url = `http://localhost:4000/${id}/api`

    //Cart will required userId (req.user.id) to retrieve Cart Id to be used
    const CartDetails = {

        userId: req.user.id,
        cartID:"testing" // PK autoincrement.
        
        }
        console.log(CartDetails.userId)
        //cartItem will require cartId to retrieve the items below
    const cartItemJSON = [
        {
           id:"1", // PK autoincrement.
           productName: "salt",
           quantity: 1
        },
        {
            id:"2",
            productName: "Chicken Breasts",
            quantity: 2
         },
         {
            id:"3",
            productName: "A Bottle of Vegetable Oil",
            quantity: 1
         },
         {
            id:"4",
            productName: "Shallot",
            quantity: 1
         }           
    ]
   // var cartItems = data[cartItemJSON]
    res.render('./user/cart/mycart', {
        cartItems: cartItemJSON
    })

})
module.exports = router


// var router = require("express").Router();
// const middleware = require("../middleware/middleware.js")
// const cartController = require("../controllers/cart.controller.js");
// const axios = require("axios");

// // Recipe Home Page
// router.get("/mycart", middleware.isLoggedIn, cartController.getMyCart)

// module.exports = router


// const CartList = () => {

//   const fetchCart = async () => {
//     const res = await axios.get("http://localhost:4000/1/api");

//     return res.data;
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const renderedCart = Object.values(cart).map((post) => {
//     return (
//       <div
//         className="card"
//         style={{ width: "30%", marginBottom: "20px" }}
//         key={post.id}
//       >
//         <div className="card-body">
//           <h3>{cart.productId}</h3>
//         </div>
//       </div>
//     );
//   });

//   return (
//     <div className="d-flex flex-row flex-wrap justify-content-between">
//       {renderedCart}
//     </div>
//   );
// };

// export default CartList;