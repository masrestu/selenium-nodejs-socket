const ChromeDriverHelper = require('./ChromeDriverHelper');

class BookInputHelper extends ChromeDriverHelper {
    constructor() {
        super();
        this.url = 'https://masrestu.github.io/simple-book-input/';
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async inputBooks(data) {
        await this.open(this.url);
        try {
            for (const iterator of data) {
                await this.inputByName('title', iterator.bookTitle);
                await this.inputByName('price', iterator.bookPrice);
                await this.inputByName('rating', iterator.bookRating);
                await this.sleep(500);
                await this.clickById('btnSave');
            }
        }
        finally {
            await this.quit();
        }
    }
}

module.exports = BookInputHelper