import { SchoolTask } from "../../model/school/SchoolTask";
import { AuthenticatedWebsiteScraper } from "../AuthenticatedWebsiteScraper";
import { WebScrapperLoadTasks } from "../WebScrapperLoadTasks";

import dotenv from "dotenv";
dotenv.config();

import config from "../../../data/appData.json";

export class ByuWebScrapperLoadTasks extends WebScrapperLoadTasks<SchoolTask, AuthenticatedWebsiteScraper<SchoolTask>> {
    protected async authenticate(): Promise<void> {
        const {By, Builder, until} = require('selenium-webdriver');
        const chrome = require('selenium-webdriver/chrome');

        const service = new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH);
        this.authDriver = new Builder().forBrowser('chrome').setChromeService(service).build();
        
        await this.authDriver.manage().setTimeouts( { implicit: 10000 } );
        
        await this.authDriver.get(config.lsHomeURL);

        const username = await this.authDriver.findElement(By.css(config.elements.username.css))
        const password = await this.authDriver.findElement(By.css(config.elements.password.css))
        await username.sendKeys(process.env.BYU_USERNAME);
        await password.sendKeys(process.env.BYU_PASSWORD);

        const loginButton = await this.authDriver.findElement(By.css(config.elements.submit.css))
        await loginButton.click();

        await this.authDriver.wait(until.elementLocated(By.css(config.elements.trust.css)), 10000);

        const trustButton = await this.authDriver.findElement(By.css(config.elements.trust.css))
        await trustButton.click();

        await this.authDriver.wait(until.elementLocated(By.css(config.elements.home.css)), 10000);
    }
}