import { TaskManager } from "./src/service/TaskManager";
import { CompareSchoolTasks } from "./src/service/CompareSchoolTasks";
import { ByuWebScrapperLoadTasks } from "./src/service/byu/ByuWebScrapperLoadTasks";
import { SchoolJsonLoadTasks } from "./src/service/school/SchoolJsonLoadTasks";
import { SchoolMarkdownLoadTasks } from "./src/service/school/SchoolMarkdownLoadTasks";
import { SchoolMarkdownUpdateTasks } from "./src/service/school/SchoolMarkdownUpdateTasks";
import { JsonSaveTasks } from "./src/service/json/JsonSaveTasks";

import * as fs from "fs";

import dotenv from "dotenv";
dotenv.config();

import { CanvasAuthWebScraper } from "./src/service/byu/CanvasAuthWebScraper";

const TEST_CLASS = process.env.TEST_CLASS !== undefined ? process.env.TEST_CLASS : "";

const main = async () => {
    const jsonString = fs.readFileSync("./data/appData.json");
    const data = JSON.parse(jsonString.toString());

    const loadSavedTasksModule = new SchoolJsonLoadTasks(data.savedTasksPath);
    const lsWebScrapper = new CanvasAuthWebScraper(TEST_CLASS);
    const loadNewTasksModule = new ByuWebScrapperLoadTasks([lsWebScrapper]);
    const loadViewTasksModule = new SchoolMarkdownLoadTasks(data.viewTasksPath);
    const compareTasksModule = new CompareSchoolTasks();
    const updateTasksModule = new SchoolMarkdownUpdateTasks(data.viewTasksPath);
    const saveTasksModule = new JsonSaveTasks(data.savedTasksPath);

    const taskManager = new TaskManager(loadSavedTasksModule, loadNewTasksModule, 
        loadViewTasksModule, compareTasksModule, updateTasksModule, saveTasksModule);

    await taskManager.manage();

}

main();