const db = require("../models");
const Address = db.address;
// Include Express Validator Functions
const { body, validationResult } = require('express-validator');

exports.validateAddress = [
    // body('name').isEmpty().withMessage('Please enter a valid Street name / Apartment building etc'),
    body('postalCode').isInt().withMessage('Please enter a valid Postal Code')
]

exports.createAddress =  (req, res) => {
    console.log(req.body)
    console.log('req.user: ' + req.user.username)
    console.log('Address: ' + Address)

    const address = {
        name: req.body.name,
        floorNo: req.body.floorNo ? req.body.floorNo : null,
        unitNo: req.body.unitNo ? req.body.floorNo : null,
        postalCode: req.body.postalCode,
        userId: req.user.id
      };
    console.log("address: " + address)

    Address.create(address)
    .then(data => {
        console.log(data)
        res.redirect('/profile')
    }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in saving address details.')
        res.redirect('/home/address/create')
    });
}

exports.getAddress = async (req, res) => {
    console.log('req.body: ' + req.body)
    console.log('req.user: ' + req.user)
    
    await Address.findOne({where: {userId: req.user.id}})
    .then(data => {
        res.redirect('/profile')
    }).catch(err => {
        req.flash('error', 'Error occurred in saving address details.')
        res.redirect('/profile')
    });
}