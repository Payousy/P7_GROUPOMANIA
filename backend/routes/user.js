const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

router.post('/signup', multer,userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile', userCtrl.profile);
router.put('/update', multer, userCtrl.updateUser);
router.delete('/delete', userCtrl.deleteUser);

module.exports = router;