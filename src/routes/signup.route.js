const express = require('express')
const router = express.Router()
const csrf = require('csurf');
const signupController = require('../app/controllers/SignUpController')

router.get('/', signupController.get)
router.post('/store',signupController.store)

router.get('/:slug', signupController.show)
module.exports = router
