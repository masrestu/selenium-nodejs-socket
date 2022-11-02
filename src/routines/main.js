const http = require('http')
const webScrapingLocalTest = require('../libs/WebScrapingLocalTest')
const webScrapingBookTest = require('../libs/WebScrapingBookTest')

const main = (app) => {
    let server = http.createServer(app)

    const { Server } = require("socket.io");
    const io = new Server(server);
    
    io.on('connection', (socket) => {
        socket.on('get_data', async () => {
            try{
                const data = await webScrapingLocalTest();
                io.emit('get_data', data);
            } catch (err) {
                console.log(err)
            }
        });

        socket.on('get_book', async () => {
            try{
                const data = await webScrapingBookTest();
                io.emit('get_book', data);
            } catch (err) {
                console.log(err)
            }
        });
    });

    return server
}

module.exports = main