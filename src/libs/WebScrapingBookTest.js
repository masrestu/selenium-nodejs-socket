const ExampleHelper = require('../helper/ExampleHelper')

const STR_TO_NUM = { one: 1, two: 2, three: 3, four: 4, five: 5 };
const wordToNumber = word => Number(STR_TO_NUM[word.toLowerCase()]);

const webScrapingBookTest = async () => {
    try {
        const url = 'https://books.toscrape.com/';
        const helper = new ExampleHelper();
        await helper.open(url);

        const children = await helper.getChildrenByXPath("//ol[@class='row']/li/article");
        const childDetails = [];
        for (const child of children) {
            const bookLink = await helper.getChildrenValueByXPath(child, './/div[1]/a', 'attr', 'href');

            let bookRating = await helper.getChildrenValueByXPath(child, './/p', 'attr', 'class');
            bookRating = wordToNumber(bookRating.split(' ')[1]);

            const bookTitle = await helper.getChildrenValueByXPath(child, ".//h3/a", 'attr', 'title');
            const bookPrice = await helper.getChildrenValueByXPath(child, ".//div[2]/p[@class='price_color']", 'text');

            childDetails.push({
                bookLink: bookLink ?? '',
                bookRating: bookRating ?? '',
                bookTitle: bookTitle ?? '',
                bookPrice: bookPrice ?? '',
            });
        }

        await helper.quit();
        return childDetails;
    } catch (error) {
        throw new Error(error);
    }
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const inputBooks = async (data) => {
    const url = 'https://masrestu.github.io/simple-book-input/';
    const helper = new ExampleHelper();
    
    try {
        await helper.open(url);
        for (const iterator of data) {
            await helper.inputByName('title', iterator.bookTitle);
            await helper.inputByName('price', iterator.bookPrice);
            await helper.inputByName('rating', iterator.bookRating);
            await sleep(500);
            await helper.clickById('btnSave');
        }
    }
    finally {
        await helper.quit();
    }
}

module.exports = { webScrapingBookTest, inputBooks }