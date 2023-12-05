const express = require('express')
const router = express.Router()
const signupController = require('../app/controllers/SignUpController')

router.get('/', signupController.get)
router.get('/create', signupController.create)
router.post('/store', signupController.store)

router.get('/:slug', signupController.show)
module.exports = router
