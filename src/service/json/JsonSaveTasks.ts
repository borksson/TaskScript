import { Task } from "../../model/Task";
import { SaveTasks } from "../interfaces/SaveTasks";

import * as fs from 'fs';

export abstract class JsonSaveTasks<T extends Task> implements SaveTasks<T> {
    private fileName: string;

    constructor(fileName: string) { 
        this.fileName = fileName;
    }

    saveTasks = async (tasks:T[]) => {
        const jsonString = fs.readFileSync(this.fileName, 'utf8');
        let appData = JSON.parse(jsonString);
        appData.tasks = tasks;
        fs.writeFileSync(this.fileName, JSON.stringify(appData));
    }
}