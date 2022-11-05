const ChromeDriverHelper = require('./ChromeDriverHelper');

class BookHelper extends ChromeDriverHelper {
    constructor() {
        super();
        this.url = 'https://books.toscrape.com/';
        this.xPath = {
            items: "//ol[@class='row']/li/article",
            item: {
                link: ".//div[1]/a",
                rating: ".//p",
                title: ".//h3/a",
                price: ".//div[2]/p[@class='price_color']",
            },
        };
    }

    async getItems() {
        const xPath = this.xPath.items;
        return await this.selectByXPath(xPath);
    }

    async putDetails(array, child) {
        const bookLink = await this.getBookLink(child);
        const bookRating = await this.getBookRating(child);
        const bookTitle = await this.getBookTitle(child);
        const bookPrice = await this.getBookPrice(child);

        const tempArray = [...array];
        tempArray.push({
            bookLink: bookLink ?? '',
            bookRating: bookRating ?? '',
            bookTitle: bookTitle ?? '',
            bookPrice: bookPrice ?? '',
        });
        return tempArray;
    }

    async getBookLink(element) {
        const xPath = this.xPath.item.link;
        return await this.selectValueByXPath(element, xPath, 'attr', 'href');
    }

    async getBookRating(element) {
        const xPath = this.xPath.item.rating;
        
        const STR_TO_NUM = { one: 1, two: 2, three: 3, four: 4, five: 5 };
        const wordToNumber = word => Number(STR_TO_NUM[word.toLowerCase()]);

        let result = await this.selectValueByXPath(element, xPath, 'attr', 'class');
        result = (result.split(' '))[1];
        return wordToNumber(result);
    }

    async getBookTitle(element) {
        const xPath = this.xPath.item.title;
        return await this.selectValueByXPath(element, xPath, 'attr', 'title');
    }

    async getBookPrice(element) {
        const xPath = this.xPath.item.price;
        return await this.selectValueByXPath(element, xPath, 'text');
    }
}

module.exports = BookHelper