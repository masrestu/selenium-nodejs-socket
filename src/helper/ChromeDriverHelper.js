const { By, until } = require('selenium-webdriver');

class ChromeDriverHelper {
    constructor() {
        this.driver = null;
        this.timeout = 300000;
    }

    async open(url) {
        try {
            if (!this.driver) {
                var chrome = require('selenium-webdriver/chrome');
                const geckoDriverPath = require('chromedriver').path;
                let service = new chrome.ServiceBuilder(geckoDriverPath).build();

                var o = new chrome.Options(Proxy = null);

                this.driver = chrome.Driver.createSession(o, service);
            }
            return await this.driver.get(url);
        } catch (error) {
            console.log(error);
        }
    }

    async quit() {
        try {
            if (this.driver) {
                await this.driver.close();
                await this.driver.quit();
                this.driver = null;
            }
        } catch (err) {
            console.log(err)
        };
    }

    async selectByXPath(xpath) {
        return await this.driver.wait(until.elementsLocated(By.xpath(xpath)), this.timeout);
    }

    async selectValueByXPath(childElement, xpath, type, attr = null) {
        const childInfo = await childElement.findElement(By.xpath(xpath));
        let result = '';
        switch (type) {
            case 'attr':
                result = this.getAttributeValue(childInfo, attr);
                break;

            case 'text':
                result = this.getTextValue(childInfo);
                break;

            default:
                break;
        }
        return result;
    }

    async getAttributeValue(childInfo, attr) {
        return await childInfo.getAttribute(attr)
    }

    async getTextValue(childInfo) {
        return await childInfo.getText()
    }

    async inputByName(index, value) {
        await this.driver.findElement(By.name(index)).sendKeys(value);
    }

    async clickById(index) {
        await this.driver.findElement(By.id(index)).click();
    }

    async getInfo() {
        let itemDetails = [];
        await this.open(this.url);
        try {
            const items = await this.getItems();
            for (const item of items) {
                itemDetails = await this.putDetails(itemDetails, item);
            }
        } catch (error) {
            console.log(error);
        } finally {
            await this.quit();
        }
        return itemDetails;
    }

    async selectChildrenByXPath(child, xpath) {
        return await child.findElements(By.xpath(xpath));
    }
}

module.exports = ChromeDriverHelper