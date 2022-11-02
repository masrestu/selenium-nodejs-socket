const { Builder, By } = require('selenium-webdriver');

const WebScrapingBookTest = async () => {
    try {
        driver = await new Builder().forBrowser('chrome').build()
        await driver.get('https://books.toscrape.com/')
        const allRows = await driver.findElements(
            By.xpath("//ol[@class='row']/li/article")
        );
        console.clear()
        return await getRows(allRows)
    } catch (error) {
        throw new Error(error)
    } finally {
        await driver.quit()
    }
}

const STR_TO_NUM = {one: 1,  two: 2, three: 3, four: 4, five: 5}
const wordToNumber = word => Number(STR_TO_NUM[word.toLowerCase()])

const getRows = async (dataRows) => {
    let dataRowDetails = []

    try {
        for (const dataRow of dataRows) {
            const bookLink = await dataRow
                .findElement(By.xpath(".//div[1]/a"))
                .getAttribute("href")

            let bookRating = await dataRow
                .findElement(By.xpath(".//p"))
                .getAttribute("class")

            bookRating = wordToNumber(bookRating.split(' ')[1])

            const bookTitle = await dataRow
                .findElement(By.xpath(".//h3/a"))
                .getAttribute("title")

            const bookPrice = await dataRow
                .findElement(By.xpath(".//div[2]/p[@class='price_color']"))
                .getText()

            dataRowDetails.push({
                bookLink: bookLink ?? '',
                bookRating: bookRating ?? '',
                bookTitle: bookTitle ?? '',
                bookPrice: bookPrice ?? '',
            })
        }
    } catch (error) {
        console.log(error)
    }
    return dataRowDetails;
}

module.exports = WebScrapingBookTest