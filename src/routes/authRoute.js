const { Router } = require('express')
const authController = require('../app/controllers/authController')

const router = Router()

router.get('login', authController.login_get)
router.get('login', authController.login_post)
router.get('signup', authController.signup_get)
router.get('signup', authController.signup_post)

module.exports = router
