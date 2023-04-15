import { Task } from '../../model/Task';

export interface IUpdateTasks<T extends Task> {
    updateTasks: (tasks: T[]) => Promise<void>;
}