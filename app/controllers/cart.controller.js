const db = require("../models");
// import the cart model once done

exports.getMyCart = (req, res) => {
    // TODO - by Anwar
    res.render('./user/cart/mycart', {
        user: req.user
    })
}