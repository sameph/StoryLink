const express = require('express');
const { createPost } = require('../Controllers/postController');
const upload = require('../middlewares/upload'); // Multer middleware
const router = express.Router();

router.post('/create', upload.single('file'), createPost);

module.exports = router;
