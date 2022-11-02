const { Builder, By } = require('selenium-webdriver');

const WebScrapingLocalTest = async () => {
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://finance.yahoo.com/currencies');
        const allRows = await driver.findElements(
            By.xpath("//table[1]/tbody/tr")
        );
        console.clear();
        return await getRows(allRows);
    } catch (error) {
        throw new Error(error);
    } finally {
        await driver.quit();
    }
}

const getRows = async (dataRows) => {
    let dataRowDetails = [];
    try {
        for (const dataRow of dataRows) {
            const currency = await dataRow
                .findElement(By.xpath(".//td[2]"))
                .getText();
            const lastPrice = await dataRow
                .findElement(By.xpath(".//td[3]/fin-streamer"))
                .getText();
            dataRowDetails.push({
                currency: currency ?? '',
                lastPrice: lastPrice ?? '',
            });
        }
    } catch (error) {
        console.log(error);
    }
    return dataRowDetails;
}

module.exports = WebScrapingLocalTest