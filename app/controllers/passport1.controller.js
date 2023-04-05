var crypto = require("crypto");
const bcrypt = require("bcrypt");
var async = require("async");
var nodemailer = require("nodemailer");
const db = require("../models");
const userDB = db.users;

exports.forgotPassword = (req, res, next) => {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                console.log("token: " + token)
                done(err, token);
              });
        },
        function(token, done) {
            const user = userDB.findOne({where: {email: `${req.body.email}`}});
            var err;
            if (!user) {
                req.flash('error', 'No account with that email address exists.');
                return res.redirect('/forgot');
            }
            const updatedUser = userDB.update({ resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000}, {
                where: {id : user.id}
            })
            if (updatedUser) {
                done(err, token, updatedUser)
            }
        },
        function(token, user, done) {
            console.log("user email: " + user.email)
            var smtpTransport = nodemailer.createTransport({
              service: 'Gmail', 
              auth: {
                user: 'GroShopCompany@gmail.com',
                pass: process.env.GMAILPW
              }
            });
            var mailOptions = {
              to: user.email,
              from: 'GroShopCompany@gmail.com',
              subject: 'GroShop Account Password Reset',
              text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
              console.log('mail sent');
              req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
              done(err, 'done');
            });
          }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
}

exports.getResetToken = (req, res) => {
    userDB.findOne({
        where: {
            resetPasswordToken: `${req.params.token}`,
            resetPasswordExpires: {
                [Op.gt]: Date.now()
            }
        }
    }).then(user => {
        res.render('reset', {token: req.params.token});
    }).catch(err => {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
    })
}

exports.postResetToken = (req, res) => {
    async.waterfall([
        function(done) {
            userDB.findOne({
                resetPasswordToken: `${req.params.token}`,
                resetPasswordExpires: {
                    [Op.gt]: Date.now()
                }
            }).then(async user => {
                if (req.body.password === req.body.confirm) {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    userDB.update(
                        { 
                            password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null}, 
                        {
                            where: {id : id}
                        }
                    ).then(num => {
                        if (num == 1) {
                        res.send({message: "User was updated successfully."});
                        } else {
                        res.send({message: `Cannot update User with id=${id}. Maybe User is not found`});
                        }
                    }).catch(err => {
                        res.status(500).send({
                            message: "Error updating User with id=" + id
                        });
                    });
                } else {
                    req.flash("error", "Passwords do not match.");
                    return res.redirect('back');
                }
            }) .catch(err => {
                req.flash("error", "Password reset token is invalid or has expired.");
                return res.redirect('back');
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
              service: 'Gmail', 
              auth: {
                user: 'GroShopCompany@gmail.com',
                pass: process.env.GMAILPW
              }
            });
            var mailOptions = {
              to: user.email,
              from: 'GroShopCompany@gmail.com',
              subject: 'Your password has been changed',
              text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
              req.flash('success', 'Success! Your password has been changed.');
              done(err);
            });
        }  
    ], function(err) {
        res.redirect('/');
    })
}
