const ChromeDriverHelper = require('./ChromeDriverHelper');

class CurrencyHelper extends ChromeDriverHelper {
    constructor() {
        super();
        this.url = 'https://finance.yahoo.com/currencies';
        this.xPath = {
            items: "//table[1]/tbody/tr",
            item: {
                name: ".//td[2]",
                price: ".//td[3]/fin-streamer",
            },
        };
    }

    async getItems() {
        const xPath = this.xPath.items;
        return await this.selectByXPath(xPath);
    }

    async putDetails(array, child) {
        const currencyName = await this.getCurrencyName(child);
        const lastPrice = await this.getLastPrice(child);

        const tempArray = [...array];
        tempArray.push({
            currency: currencyName ?? '',
            lastPrice: lastPrice ?? '',
        });
        return tempArray;
    }

    async getCurrencyName(element) {
        const xPath = this.xPath.item.name;
        return await this.selectValueByXPath(element, xPath, 'text');
    }
    
    async getLastPrice(element) {
        const xPath = this.xPath.item.price;
        return await this.selectValueByXPath(element, xPath, 'text');
    }
}

module.exports = CurrencyHelper