import { Task } from "../../model/Task";
import { LoadTasks } from "./LoadTasks";

import * as fs from 'fs';

export abstract class MarkdownLoadTasks<T extends Task> extends LoadTasks<T> {
    private fileName: string;

    constructor(fileName: string) {
        super();
        this.fileName = fileName;
    }

    loadFileTasks = (): any[] => {
        const markdownString = fs.readFileSync(this.fileName, 'utf8');
        const markdownTasks = markdownString.split('\n');
        return markdownTasks;
    }

    protected abstract createTask(markdownTask: any): T;
}