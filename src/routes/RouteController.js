const express = require('express')
const ConfigDirectory = require('../config/ConfigDirectory')

let router = express.Router();

router.get('/', async (request, response) => {
	response.sendFile(ConfigDirectory.templateDir + '/home.html');
})

router.get('/book', async (request, response) => {
	response.sendFile(ConfigDirectory.templateDir + '/book.html');
})

router.get('/quotes', async (request, response) => {
	response.sendFile(ConfigDirectory.templateDir + '/quotes.html');
})

module.exports = router