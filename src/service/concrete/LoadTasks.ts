import { Task } from "../../model/Task";
import { ILoadTasks } from "../interfaces/ILoadTasks";

export abstract class LoadTasks<T extends Task> implements ILoadTasks<T> {
    loadTasks: () => Promise<T[]> = () => {
        return new Promise((resolve, reject) => {
            try{
                const tasks: T[] = [];
                const jsonTasks = this.loadFileTasks();
                for (const jsonTask of jsonTasks) {
                    const task = this.createTask(jsonTask);
                    tasks.push(task);
                }
                resolve(tasks);
            }
            catch (error) {
                reject(error);
            }
        });
    }

    protected abstract loadFileTasks(): any[];

    protected abstract createTask(jsonTask: any): T;
}