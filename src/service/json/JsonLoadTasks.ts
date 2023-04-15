import { Task } from "../../model/Task";
import { LoadTasks } from "../interfaces/LoadTasks";

import * as fs from 'fs';

export abstract class JsonLoadTasks<T extends Task> implements LoadTasks<T> {
    private fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    loadTasks = async (): Promise<T[]> => {
        const tasks: T[] = [];
        const jsonTasks = await this.loadJsonTasks();
        for (const jsonTask of jsonTasks) {
            const task = this.createTask(jsonTask);
            tasks.push(task);
        }
        return tasks;
    }

    private loadJsonTasks = (): Promise<any[]> => {
        const jsonString = fs.readFileSync(this.fileName, 'utf8');
        const appData = JSON.parse(jsonString);
        return appData.tasks;

    }

    protected abstract createTask(jsonTask: any): T;
}