import { Task } from '../../model/Task';

export interface SaveTasks<T extends Task> {
    saveTasks: (tasks: T[]) => Promise<void>;
}