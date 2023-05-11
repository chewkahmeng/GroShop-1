const express = require('express')
var router = express.Router();

var Publishable_Key = 'pk_test_51N5q9IA6c6T1aIgQAXR2waaFyQ5msOTxy9LREPrL6L2mU2rPst6NGmgeMw7pzdF8uFuebdqrKLzTEtJDCtuosbZW00t3pcflOp'
var Secret_Key = 'sk_test_51N5q9IA6c6T1aIgQONx66eSlmbbOWjIcvPPBHfGIwajy9dfvPbWLUGaDdhMlFLGlhzKpjxjGQYyDTKXYse7GQtTC009ybmfCu4'

const stripe = require('stripe')(Secret_Key)

router.get('/', function(req, res){
	res.render('./user/checkout', {
	key: Publishable_Key
	})
})

router.post('/checkout', function(req, res){
  var stripeToken = req.body.stripeToken;
  var charge = stripe.charges.create({
    amount: 2500,
    currency: "sgd", //comment out to trigger StripeInvalidRequestError
    card: stripeToken
  }, function(err, charge) {
    if (err) {
      req.flash('error', 'Payment Unsuccessful. Please try again.')
      return res.redirect('/home/cart/mycart')
    }
    else {
      req.flash('success', 'Payment Successful.')
      return res.redirect('/home/recipes') //should redirect to order summary page
    }
  })
})

module.exports = router;