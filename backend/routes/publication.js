const express = require('express');
const router = express.Router();
const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

router.post('/', multer, publicationCtrl.createPublication);
router.get('/:id', multer, publicationCtrl.getPublicationId);
router.get('/', multer, publicationCtrl.getPublications);
router.put('/:id', multer, publicationCtrl.modifyMessage);
router.delete('/:id', publicationCtrl.deletePublication);
module.exports = router;