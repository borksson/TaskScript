import { Task } from '../../model/Task';

export interface ISaveTasks<T extends Task> {
    saveTasks: (tasks: T[]) => Promise<void>;
}