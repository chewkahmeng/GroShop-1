var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const cartController = require("../controllers/cart.controller.js");


const { check, validationResult } = require('express-validator')

// Recipe Home Page
router.get("/mycart", middleware.isLoggedIn, cartController.getMyCart)


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