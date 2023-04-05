const db = require("../models");
const User = db.users;
const Token = db.tokens;
const sendEmail = require("../util/email/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.requestPasswordReset = async (req) => {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) throw new Error("Email does not exist");
  
    let token = await Token.findOne({ where: {userId: user.id}});
    if (token) await Token.destroy({ where: {id: token.id}});
  
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);
  
    await new Token({
      userId: user.id,
      token: hash
    }).save();
  
    const link = `${req.headers.host}/reset/${resetToken}/${user.id}`;
    console.log(user.email)
    sendEmail(
      user.email,
      "Password Reset Request",
      {
        name: user.username,
        link: link,
      },
      "./template/requestResetPassword.handlebars"
    );
    return { link };
  };
  
exports.resetPassword = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ where: {userId: userId} });
  
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
  
    console.log(passwordResetToken.token, token);
  
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
  
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
  
    const hash = await bcrypt.hash(password, 10);
  
    await User.update({ password: hash}, 
        {where: {id : userId}})
  
    const user = await User.findByPk(userId)
  
    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.username,
      },
      "./template/resetPassword.handlebars"
    );
  
    await Token.destroy({where: {id: passwordResetToken.id}})
  
    return { message: "Password reset was successful" };
  };