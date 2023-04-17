import { Task } from "../../model/Task";
import { IUpdateTasks } from "../interfaces/IUpdateTasks";

import * as fs from 'fs';

export abstract class MarkdownUpdateTasks<T extends Task> implements IUpdateTasks<T> {
    private fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    updateTasks: (tasks: T[]) => Promise<void> = (tasks: T[]) => {
        return new Promise((resolve, reject) => {
            let markdownData = '';
            for (const task of tasks) {
                markdownData += this.createMarkdownTask(task);
                markdownData += '\n';
            }
            fs.writeFileSync(this.fileName, markdownData);
            resolve();
        });
    }

    protected abstract createMarkdownTask(task: T): string;
}
    