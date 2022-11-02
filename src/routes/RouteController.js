const express = require('express')
const ConfigDirectory = require('../config/ConfigDirectory')

let router = express.Router()

router.get('/', async (request, response) => {
	response.sendFile(ConfigDirectory.templateDir + '/home.html');
})

router.get('/book', async (request, response) => {
	response.sendFile(ConfigDirectory.templateDir + '/book.html');
})

module.exports = router