import { Task } from "../../model/Task";
import { LoadTasks } from "../LoadTasks";

import * as fs from 'fs';

export abstract class JsonRequestLoadTasks<T extends Task> extends LoadTasks<T> {
    private req: any;

    constructor(req: any) {
        super();
        this.req = req;
    }

    loadFileTasks = async () => {
        return this.req.body.tasks;
    }
}