const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');
const multer = require('../middleware/multer-config');

router.get('/', multer, adminCtrl.getPublications);
router.get('/commentaire', adminCtrl.getCommentaires);
router.delete('/commentaire/delete/:id', adminCtrl.deleteComment);
router.put('/updatestatus/:id', adminCtrl.modifyMessage);
router.put('/updatestatuscomment/:id', adminCtrl.modifyComment);
router.get('/users', adminCtrl.getAllUsers);
router.get('/users/:id', adminCtrl.getUserId);
router.delete('/users/delete/:id', adminCtrl.deleteUserAdmin);
router.delete('/publication/delete/:id', adminCtrl.deletePublication);


module.exports = router;