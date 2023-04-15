import { Task } from "../../model/Task";
import { ILoadTasks } from "../interfaces/ILoadTasks";

export abstract class LoadTasks<T extends Task> implements ILoadTasks<T> {
    public async loadTasks(): Promise<T[]> {
        const tasks: T[] = [];
        const jsonTasks = await this.loadFileTasks();
        for (const jsonTask of jsonTasks) {
            const task = this.createTask(jsonTask);
            tasks.push(task);
        }
        return tasks;
    }

    protected abstract loadFileTasks(): Promise<any[]>;

    protected abstract createTask(jsonTask: any): T;
}