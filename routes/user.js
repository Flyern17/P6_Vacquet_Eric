const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const goodPassword = require('../middleware/password');

router.post('/signup', goodPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
