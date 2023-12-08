const { Router } = require('express')
const logoutController = require('../app/controllers/LogoutController')

const router = Router()

router.get('/', logoutController.logout)

router.post('/logout',logoutController.show)


module.exports = router
