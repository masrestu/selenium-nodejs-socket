const ChromeDriverHelper = require('./ChromeDriverHelper');

class QuoteHelper extends ChromeDriverHelper {
    constructor() {
        super();
        this.url = 'http://quotes.toscrape.com/js-delayed/';
        this.xPath = {
            items: "//div[@class='quote']",
            item: {
                text: ".//span[@class='text']",
                author: ".//small[@class='author']",
                tags: ".//a[@class='tag']",
            },
        };
    }

    async getItems() {
        const xPath = this.xPath.items;
        return await this.selectByXPath(xPath);
    }

    async putDetails(array, child) {
        const text = await this.getQuoteText(child);
        const author = await this.getAuthor(child);

        const tempArray = [...array];
        tempArray.push({
            text: text ?? '',
            author: author ?? '',
        });
        return tempArray;
    }

    async getQuoteText(element) {
        const xPath = this.xPath.item.text;
        return await this.selectValueByXPath(element, xPath, 'text');
    }
    
    async getAuthor(element) {
        const xPath = this.xPath.item.author;
        return await this.selectValueByXPath(element, xPath, 'text');
    }
}

module.exports = QuoteHelper