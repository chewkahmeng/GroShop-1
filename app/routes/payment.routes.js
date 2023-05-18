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

router.post('/checkout', async (req, res) => {
  var stripeToken = req.body.stripeToken;
  console.log("in POST /HOME/CHECKOUT/CHECKOUT")
  var charge = stripe.charges.create({
    amount: req.body.checkoutTotal,
    currency: "sgd", //comment out to trigger StripeInvalidRequestError
    card: stripeToken
  }, async (err, charge) => {
    if (err) {
      req.flash('error', 'Payment Unsuccessful. Please try again.')
      return res.redirect('/home/cart/mycart')
    }
    else {
      req.flash('success', 'Payment Successful.')
      const userId = req.user.id
      console.log("userId=======> ",userId);
      const cartUrl = `http://localhost:4000/${userId}/getcart`
      var cartId = null
      //getting cartId
      await fetch(cartUrl)
      .then(response => response.json())
      .then(data => {
        cartId = data[0].cartId
      })
      console.log("cartId=======> ",cartId);

      //creating order
      const url = `http://localhost:4004/createorder`
      const paymentAmount = charge.amount / 100;
      const data = {
          userId: userId,
          cartId: cartId,
          amount: paymentAmount
        };
        let fetchData = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
          })
        }
        await fetch(url, fetchData)
      .then((response) => response.json())
      .then((data) =>{
        console.log("data=======> \n",data);
        req.flash('success', 'Order Created successfully.')
        res.redirect(`/home/orders/orders`)
      })
    }
  })
})

module.exports = router;