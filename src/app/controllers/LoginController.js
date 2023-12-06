const User = require('../models/User')
const bcrypt = require('bcrypt')
const Joi = require('joi') // Import Joi for validation
class LoginController {
  login_get(req, res) {
    res.render('auth/login')
  }

  async login_post(req, res, next) {
    try {
      // Define a Joi schema for login validation
      const loginSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      })

      const result = loginSchema.validate(req.body)

      if (result.error) {
        res.redirect('/login')
        return
      }

      // Use findOne to find a single user by email
      const user = await User.findOne({ email: result.value.email })

      if (!user) {
        res.redirect('/login')
        return
      }

      const passwordIsValid = bcrypt.compareSync(
        result.value.password,
        user.password,
      )

      if (!passwordIsValid) {
        res.redirect('/login')
        return
      }
      if (passwordIsValid) {
        // If login is successful, redirect to the root URL
        res.redirect('/')
      } else {
        // If login fails, redirect to the login page
        res.redirect('/login')
      }
    } catch (error) {
      next(error)
    }
  }

  show(req, res) {
    res.render('/')
  }
}

module.exports = new LoginController()
