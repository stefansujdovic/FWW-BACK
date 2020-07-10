const express = require('express');
const router = express.Router();
const { userValidator } = require('../validator');

const { registration , login, logout} = require('../controllers/auth');

router.post('/registration', userValidator, registration);
router.post('/login', login);
router.post('/logout', logout)

module.exports = router;