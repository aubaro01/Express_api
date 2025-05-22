const express = require('express');
const multer = require('multer');
const router = express.Router();
const documentController = require('../controllers/documentController');

const upload = multer({ dest: 'data/' });


router.post('/upload', upload.single('document'), documentController.uploadDocument);
router.get('/chain', documentController.getBlockchain);
router.get('/validate', documentController.validateChain);

module.exports = router;
