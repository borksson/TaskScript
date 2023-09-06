import { Task } from "../../model/Task";
import { IUpdateTasks } from "../interfaces/IUpdateTasks";

import * as fs from 'fs';

export abstract class MarkdownResponseUpdateTasks<T extends Task> implements IUpdateTasks<T> {
    private res: any;

    constructor(res: any) { 
        this.res = res;
    }

    updateTasks: (tasks: T[]) => Promise<void> = (tasks: T[]) => {
        return new Promise((resolve, reject) => {
            let markdownData = '';
            for (const task of tasks) {
                if (task.status !== 'completed') {
                    markdownData += this.createMarkdownTask(task);
                    markdownData += '\n';
                }
            }
            this.res.send(markdownData);
            resolve();
        });
    }

    protected abstract createMarkdownTask(task: T): string;
}
    