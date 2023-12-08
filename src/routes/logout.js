const { Router } = require('express')
const authController = require('../app/controllers/authController')

const router = Router()

router.get('logout', authController.login_get)


module.exports = router
