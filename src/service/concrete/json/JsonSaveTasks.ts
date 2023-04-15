import { Task } from "../../../model/Task";
import { ISaveTasks } from "../../interfaces/ISaveTasks";

import * as fs from 'fs';

export abstract class JsonSaveTasks<T extends Task> implements ISaveTasks<T> {
    private fileName: string;

    constructor(fileName: string) { 
        this.fileName = fileName;
    }

    saveTasks: (tasks: T[]) => Promise<void> = (tasks: T[]) => {
        return new Promise((resolve, reject) => {
            try {
                const jsonString = fs.readFileSync(this.fileName, 'utf8');
                let appData = JSON.parse(jsonString);
                appData.tasks = tasks;
                fs.writeFileSync(this.fileName, JSON.stringify(appData));
    
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
}