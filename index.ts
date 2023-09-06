import express from "express";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

import { TaskManager } from "./src/service/TaskManager";
import { CompareSchoolTasks } from "./src/service/CompareSchoolTasks";
import { SchoolJsonLoadTasks } from "./src/service/school/SchoolJsonLoadTasks";
import { JsonSaveTasks } from "./src/service/json/JsonSaveTasks";
import { SchoolMarkdownResponseUpdateTasks } from "./src/service/school/SchoolMarkdownResponseUpdateTasks";
import { SchoolJsonRequestLoadTasks } from "./src/service/school/SchoolJsonRequestLoadTasks";
import { CanvasAuthWebScraper } from "./src/service/byu/CanvasAuthWebScraper";
import { LSAuthWebScraper } from "./src/service/byu/LSAuthWebScraper";
import { ByuWebScrapperLoadTasks } from "./src/service/byu/ByuWebScrapperLoadTasks";
import { SchoolMarkdownLoadTasks } from "./src/service/school/SchoolMarkdownLoadTasks";


import config from "./data/appData.json";
import { SchoolMarkdownUpdateTasks } from "./src/service/school/SchoolMarkdownUpdateTasks";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: any, res: any) => {
    res.send("Hello World");
});

app.post("/sync", async (req: any, res: any) => {
    console.log(req.body);

    const jsonString = fs.readFileSync("./data/appData.json");
    const data = JSON.parse(jsonString.toString());

    const loadSavedTasksModule = new SchoolJsonLoadTasks(data.savedTasksPath);
    const loadViewTasksModule = new SchoolJsonRequestLoadTasks(req);
    const compareTasksModule = new CompareSchoolTasks();
    const updateTasksModule = new SchoolMarkdownResponseUpdateTasks(res);
    const saveTasksModule = new JsonSaveTasks(data.savedTasksPath);

    const taskManager = new TaskManager(loadSavedTasksModule, undefined, 
        loadViewTasksModule, compareTasksModule, updateTasksModule, saveTasksModule);

    console.log("Starting task manager");
    await taskManager.manage();
    console.log("Finished task manager");
});

app.post("/update", async (req: any, res: any) => {

    res.send("Update started");

    const jsonString = fs.readFileSync("./data/appData.json");
    const data = JSON.parse(jsonString.toString());

    const loadSavedTasksModule = new SchoolJsonLoadTasks(data.savedTasksPath);

    let websites = [];
    for (const website of config.websites) {
        if (website.type === "canvas") {
            websites.push(new CanvasAuthWebScraper(website.link));
        } else if (website.type === "learningsuite") {
            websites.push(new LSAuthWebScraper(website.link));
        }
    }

    const loadNewTasksModule = new ByuWebScrapperLoadTasks(websites);
    const compareTasksModule = new CompareSchoolTasks();
    const saveTasksModule = new JsonSaveTasks(data.savedTasksPath);

    const taskManager = new TaskManager(loadSavedTasksModule, loadNewTasksModule, 
        undefined, compareTasksModule, undefined, saveTasksModule);

    await taskManager.manage();
});

// Add node-chron for updating every few days

app.listen(3010, () => {
    console.log("Server is running on port 3010");
});