import { SchoolTask } from "../../model/school/SchoolTask";
import { AuthenticatedWebsiteScraper } from "../AuthenticatedWebsiteScraper";

import config from "../../../data/appData.json";
import { Assignment } from "../../model/school/Assignment";

export class LSAuthWebScraper extends AuthenticatedWebsiteScraper<SchoolTask> {
    constructor(websiteUrl: string) {
        super(websiteUrl);
    }

    protected _getTasks: (authDriver: any) => Promise<SchoolTask[]> = async (authDriver: any) => {

        const {By, until} = require('selenium-webdriver');
        
        await authDriver.get(this.websiteUrl);

        await authDriver.wait(until.elementLocated(By.css(config.elements.ls_body.css)), 10000);

        const html = await authDriver.getPageSource();
        
        return this.parseTasks(html);
    }

    parseTasks(html: any): SchoolTask[] {
        const { JSDOM } = require('jsdom');
        const window = new JSDOM(html).window;
        const $ = require('jquery')(window);

        const className = $(config.jquery.className).text().replace(/\s+/g, '');

        //console.log("CLASS NAME:", className);

        const assignmentElements = $(config.jquery.assignment)

        let tasks: SchoolTask[] = [];

        if (assignmentElements.length === 0) {
            console.log("No assignments found");
            console.log("HTML:", html);
            throw new Error("No assignments found");
        }

        assignmentElements.each((index: number, element: any) => {
            let text = $(element).text().split("\n")
            while(text[0].trim() === "") {
                text.shift();
            }
            const title = text[0].trim();
            //console.log("TITLE:", title);

            text.shift();
            text = text.join(" ").replace(/\s\s+/g, ' ');

            const dateRegex = /[A-Z][a-z]{2}\s\d{1,2},\s\d{1,2}:\d{2}\s(?:AM|PM)/g
            const dates = text.matchAll(dateRegex);
            // Parse dates
            let dueDate = null;
            for (const date of dates) {
                const parsedDate = new Date(date[0]);
                if (dueDate === null || dueDate < parsedDate) {
                    dueDate = parsedDate;
                }
            }
            // Set year
            if (dueDate === null) {
                throw new Error("No date found");
            }
            dueDate.setFullYear(new Date().getFullYear());
            //console.log("DUE DATE:", dueDate.toLocaleString());

            const status = text.includes("Completed") ? "completed" : "not_completed";
            //console.log("STATUS:", status);

            // Subtract buffer for start date
            const startDate = new Date(dueDate);
            startDate.setDate(startDate.getDate() - config.buffer);

            // If it falls on a Sunday, subtract another day
            if (startDate.getDay() === 0) {
                startDate.setDate(startDate.getDate() - 1);
            }

            //console.log("START DATE:", startDate.toLocaleString());
            // TODO: Switch for task type
            const task = new Assignment(title, "", status, new Date(0), dueDate, startDate, className, 0)
            tasks.push(task);
        });

        return tasks;
    }
}