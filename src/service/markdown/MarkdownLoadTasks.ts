import { Task } from "../../model/Task";
import { LoadTasks } from "../LoadTasks";

import * as fs from 'fs';

// FORMAT: 
// - [ ] Test @due(2023-04-14) #Assignment #Class/Test #Status/not_started
//     Description: Test
//     Due Date: 4/13/2023 10:07:52 PM

export abstract class MarkdownLoadTasks<T extends Task> extends LoadTasks<T> {
    private fileName: string;
    protected taskRegex: RegExp;

    constructor(fileName: string, taskRegex: RegExp) {
        super();
        this.fileName = fileName;
        this.taskRegex = taskRegex;
    }

    loadFileTasks = async () => {
        const markdownString = fs.readFileSync(this.fileName, 'utf8');
        const markdownTasks = markdownString.matchAll(this.taskRegex);
        const stringTasks: string[] = [];
        for (const task of markdownTasks) {
            stringTasks.push(task[0].trim());
        }
        console.log("MARKDOWN TASKS:", stringTasks);
        return stringTasks;
    }
}