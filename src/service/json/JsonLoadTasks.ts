import { Task } from "../../model/Task";
import { LoadTasks } from "../LoadTasks";

import * as fs from 'fs';

export abstract class JsonLoadTasks<T extends Task> extends LoadTasks<T> {
    private fileName: string;

    constructor(fileName: string) {
        super();
        this.fileName = fileName;
    }

    loadFileTasks = async () => {
        const jsonString = fs.readFileSync(this.fileName, 'utf8');
        const appData = JSON.parse(jsonString);
        return appData.tasks;
    }
}