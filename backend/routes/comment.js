const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/commentaire');
const auth = require('../middleware/auth');

router.post('/:id',commentCtrl.createComment);
router.get('/:id', commentCtrl.getComments);
router.get('/comment/:id', commentCtrl.getCommentId);
router.put('/update/:id', commentCtrl.updateComment);
router.delete('/delete/:id', commentCtrl.deleteComment);

module.exports = router;