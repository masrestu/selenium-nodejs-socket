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
        const tags = await this.getTags(child);

        const tempArray = [...array];
        tempArray.push({
            text: text ?? '',
            author: author ?? '',
            tags: tags ?? '',
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

    async getTags(element) {
        const xPath = this.xPath.item.tags;
        const tags = await this.selectChildrenByXPath(element, xPath);

        const result = [];
        for (const tag of tags) {
            result.push(await this.getTextValue(tag));
        }
        return result;
    }
}

module.exports = QuoteHelper