import { Task } from '../../model/Task';

export interface UpdateTasks<T extends Task> {
    updateTasks: (tasks: T[]) => Promise<void>;
}