import { Task } from "../../model/Task";

export interface LoadTasks<T extends Task> {
    loadTasks: () => Promise<T[]>;
}