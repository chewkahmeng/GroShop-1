const express = require('express')
var router = express.Router();

var Publishable_Key = 'pk_test_51N5q9IA6c6T1aIgQAXR2waaFyQ5msOTxy9LREPrL6L2mU2rPst6NGmgeMw7pzdF8uFuebdqrKLzTEtJDCtuosbZW00t3pcflOp'
var Secret_Key = 'sk_test_51N5q9IA6c6T1aIgQONx66eSlmbbOWjIcvPPBHfGIwajy9dfvPbWLUGaDdhMlFLGlhzKpjxjGQYyDTKXYse7GQtTC009ybmfCu4'

const stripe = require('stripe')(Secret_Key)

router.post('/', function(req, res) {
  console.log("in POST /home/checkout")
  console.log(req.body)
  const checkoutTotal = req.body.checkoutTotal
	res.render('./user/checkout', {
	  key: Publishable_Key,
    checkoutTotal: checkoutTotal
	})
})

router.get('/', function(req, res){
	res.render('./user/checkout', {
	  key: Publishable_Key
	})
})

router.post('/checkout', function(req, res){
  var stripeToken = req.body.stripeToken;
  console.log("in POST /HOME/CHECKOUT/CHECKOUT")
  console.log(req.body)
  var charge = stripe.charges.create({
    amount: req.body.checkoutTotal,
    currency: "sgd", //comment out to trigger StripeInvalidRequestError
    card: stripeToken
  }, function(err, charge) {
    if (err) {
      req.flash('error', 'Payment Unsuccessful. Please try again.')
      return res.redirect('/home/cart/mycart')
    }
    else {
      req.flash('success', 'Payment Successful.')
      return res.redirect('/home/orders/orders') //should redirect to order summary page
    }
  })
})

module.exports = router;