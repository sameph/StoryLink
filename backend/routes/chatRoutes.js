const express = require('express');
const { getChatHistory } = require('../Controllers/chatController');
const router = express.Router();

router.get('/history', getChatHistory);

module.exports = router;
