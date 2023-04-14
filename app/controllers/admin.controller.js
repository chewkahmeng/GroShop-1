const bcrypt = require("bcrypt");
const db = require("../models");
const Employee = db.employees;
const adminAddress = db.adminAddress;
// Include Express Validator Functions
const { check, validationResult } = require('express-validator');

exports.validatePasswordChange = [
  check('password').isLength({ min: 8 }).withMessage('New Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('New Password Must Contain a Number').matches('[A-Z]').withMessage('New Password Must Contain an Uppercase Letter')
  .custom((value,{req, loc, path}) => {
    if (value !== req.body.confirmPassword) {
        // trow error if passwords do not match
        throw new Error("New Password and Confirm New Password don't match");
    } else {
        return value;
    }
  })
  .trim().escape()
]

exports.updateEmployee = (req, res) => {
    const id = req.params.id;
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
  
    // update username and/or email
    Employee.update({ username: req.body.username}, {
      where: {id : id}
    }).then(num => {
      if (num == 1) {
        req.flash('success', 'Employee details updated successfully.')
        res.redirect('/admin/profile')
      } else {
        req.flash('error', 'Employee not found in database.')
        res.redirect(`/admin/profile/${id}/update`)
      }
    }).catch(err => {
      req.flash('error', `Error occurred in saving employee details: ${err}`)
      res.redirect(`/admin/profile/${id}/update`)
    });
};

exports.changeUserPassword = async (req, res) => {
    const id = req.params.id;
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.password;
    const newPasswordConfirmation = req.body.confirmPassword;
  
    if (newPasswordConfirmation !== newPassword) {
      req.flash('error', 'No employee found in database')
      return res.redirect(`/admin/profile/${id}/changePassword`) 
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    const employeeInDB = await Employee.findOne({where: {id : id}});
    if (employeeInDB) {
      if (await bcrypt.compare(oldPassword, employeeInDB.password)) {
        // update password
        Employee.update({ password: hashedPassword}, {
          where: {
            id : id,
          }
        }).then(num => {
          if (num == 1) {
            req.flash('success', 'Password changed successfully.')
            return res.redirect('/admin/profile')
          } else {
            req.flash('error', 'No employee found in database')
            return res.redirect(`/admin/profile/${id}/changePassword`)        
          }
        }).catch(err => {
          req.flash('error', `Error occurred in saving new password: ${err}`)
          return res.redirect(`/admin/profile/${id}/changePassword`)  
        });
      } else {
        req.flash('error', 'Old password is incorrect.')
        return res.redirect(`/admin/profile/${id}/changePassword`) 
      }
    } else {
      req.flash('error', 'No employee found in database')
      return res.redirect(`/admin/profile/${id}/changePassword`)  
    }
  
};

exports.getUserProfile = async (req, res) => {
    const employee = await Employee.findByPk(req.user.id)
    const address = await adminAddress.findOne({where: {userId: req.user.id}, order: [ ['createdAt', 'DESC']]})
    res.render('admin/profile', {
      employee: employee,
      adminAddress: address 
    });
};