import { Task } from "../../model/Task";

export interface ICompareTasks<T extends Task> {
    compareTasks: (savedTasks: T[], viewTasks: T[], newTasks: T[]) => Promise<T[]>;
}