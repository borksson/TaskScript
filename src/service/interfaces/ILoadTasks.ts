import { Task } from "../../model/Task";

export interface ILoadTasks<T extends Task> {
    loadTasks: () => Promise<T[]>;
}