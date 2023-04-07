const db = require("../models");
const Address = db.address;
// Include Express Validator Functions
const { body, validationResult } = require('express-validator');

exports.validateAddress = [
    // body('name').isEmpty().withMessage('Please enter a valid Street name / Apartment building etc'),
    body('postalCode').isInt().withMessage('Please enter a valid Postal Code')
]

exports.createAddress =  async (req, res) => {
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
        req.flash('success', 'Address created successfully.')
        res.redirect('/home/profile')
    }).catch(err => {
        console.log(err)
        req.flash('error', 'Error occurred in saving address details.')
        res.redirect('/home/address/create')
    });
}

exports.updateAddress = (req, res) => {
    console.log(req.body)
    console.log('req.user: ' + req.user.username)
    const address = {
        name: req.body.name,
        floorNo: req.body.floorNo ? req.body.floorNo : null,
        unitNo: req.body.unitNo ? req.body.unitNo : null,
        postalCode: req.body.postalCode,
    }

    Address.update(
    { 
        name: address.name, floorNo: address.floorNo, unitNo: address.unitNo, postalCode: address.postalCode
    }, 
    {
        where: { id: req.params.id }
    })
    .then(num => {
      if (num == 1) {
        req.flash('success', 'Address updated successfully.')
        res.redirect('/home/profile')
      } else {
        req.flash('error', 'No address found in database')
        res.redirect(`/home/address/${req.params.id}/update`)
      }
    })
    .catch(err => {
      console.log(err)
      req.flash('error', `Error occurred in saving address details.: ${err}`)
      res.redirect(`/home/address/${req.params.id}/update`)
    });
}

exports.getAddressToUpdate = async (req, res) => {
    const addressId = req.params.id
    const address = await Address.findByPk(addressId)

    res.render('user/addressForm', {
        user: req.user,
        mode: "UPDATE",
        address: address
    })
}


exports.getAddress = async (req, res) => {
    console.log('req.body: ' + req.body)
    console.log('req.user: ' + req.user)
    
    await Address.findOne({where: {userId: req.user.id}})
    .then(data => {
        res.redirect('/home/profile')
    }).catch(err => {
        req.flash('error', 'Error occurred in saving address details.')
        res.redirect('/home/profile')
    });
}

exports.deleteAddress = async (req, res) => {
    const id = req.params.id;
    Address.destroy({
        where: { id: id }
      })
    .then(num => {
        if (num == 1) {
            req.flash('success', 'Address deleted successfully.')
            res.redirect('/home/profile')
        } else {
            req.flash('error', 'No address found in database')
            res.redirect(`/home/address/${req.params.id}/update`)
          }
        })
        .catch(err => {
            console.log(err)
            req.flash('error', `Error occurred in deleing address details.: ${err}`)
            res.redirect('/home/profile')
        });
}