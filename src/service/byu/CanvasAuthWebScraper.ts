import { SchoolTask } from "../../model/school/SchoolTask";
import { AuthenticatedWebsiteScraper } from "../AuthenticatedWebsiteScraper";

import config from "../../../data/appData.json";
import { Assignment } from "../../model/school/Assignment";

export class CanvasAuthWebScraper extends AuthenticatedWebsiteScraper<SchoolTask> {
    constructor(websiteUrl: string) {
        super(websiteUrl);
    }
    
    protected _getTasks: (authDriver: any) => Promise<SchoolTask[]> = async (authDriver: any) => {
        const {By, until} = require('selenium-webdriver');
        
        await authDriver.get(this.websiteUrl);

        await authDriver.wait(until.elementLocated(By.css(config.elements.canvas_body.css)), 10000);

        const html = await authDriver.getPageSource();
        
        return this.parseTasks(html);
    }

    parseTasks(html: any): SchoolTask[] {
        const { JSDOM } = require('jsdom');
        const window = new JSDOM(html).window;
        const $ = require('jquery')(window);

        const assignments = $(config.jquery.canvas_assignment);

        const courseName = $(config.jquery.canvas_className).text().replace(/\s+/g, '');

        let tasks: SchoolTask[] = [];

        if (assignments.length === 0) {
            console.log("No assignments found");
            console.log("HTML:", html);
            throw new Error("No assignments found");
        }

        assignments.each((index: number, element: any) => {
            let text = $(element).text().split("\n")
            while(text[0].trim() === "") {
                text.shift();
            }
            const title = text[0].trim();
            //console.log("TITLE:", title);

            text.shift();
            text = text.join(" ").replace(/\s\s+/g, ' ');
            //console.log("TEXT:", text);

            if(text.includes("group-") || text.includes("final-grade")) {
                return;
            }

            const dateRegex = /[A-Z][a-z]{2}\s\d{1,2}\sby\s\d{1,2}:\d{2}(?:am|pm)/g
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

            let status = text.includes("unsubmitted") ? "not_completed" : "completed" ;
            status = text.includes("missing") ? "missing" : status;

            // console.log("STATUS:", status);
            // console.log("TEXT:", text);

            // Subtract buffer for start date
            const startDate = new Date(dueDate);
            startDate.setDate(startDate.getDate() - config.buffer);

            // If it falls on a Sunday, subtract another day
            if (startDate.getDay() === 0) {
                startDate.setDate(startDate.getDate() - 1);
            }

            //console.log("START DATE:", startDate.toLocaleString());
            // TODO: Switch for task type
            const task = new Assignment(title, "", status, new Date(0), dueDate, startDate, courseName, 0)
            tasks.push(task);
        });
    

        return tasks;

    }
}