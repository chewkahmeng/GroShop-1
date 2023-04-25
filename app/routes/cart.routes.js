var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const { check, validationResult } = require('express-validator')

// Cart Home Page
// Method 1: calling microservice api in cart.routes.js to fetch data 
// and then render the EJS page to be seen on browser
// See method 2 in mycart.ejs for another way to fetch data from microservice api 
router.get("/mycart", middleware.isLoggedIn, async (req, res) => {
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