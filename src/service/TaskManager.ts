import { ILoadTasks } from './interfaces/ILoadTasks';
import { ICompareTasks } from './interfaces/ICompareTasks';
import { IUpdateTasks } from './interfaces/IUpdateTasks';
import { ISaveTasks } from './interfaces/ISaveTasks';
import { Task } from '../model/Task';

export class TaskManager<T extends Task> {
    loadSavedTasksModule: ILoadTasks<T>;
    loadNewTasksModule: ILoadTasks<T>;
    loadViewTasksModule: ILoadTasks<T>;
    compareTasksModule: ICompareTasks<T>;
    updateTasksModule: IUpdateTasks<T>;
    saveTasksModule: ISaveTasks<T>;

    constructor(loadSavedTasksModule: ILoadTasks<T>, loadNewTasksModule: ILoadTasks<T>, loadViewTasksModule: ILoadTasks<T>,
        compareTasksModule: ICompareTasks<T>, updateTasksModule: IUpdateTasks<T>, saveTasksModule: ISaveTasks<T>) {
        this.loadSavedTasksModule = loadSavedTasksModule;
        this.loadNewTasksModule = loadNewTasksModule;
        this.loadViewTasksModule = loadViewTasksModule;
        this.compareTasksModule = compareTasksModule;
        this.updateTasksModule = updateTasksModule;
        this.saveTasksModule = saveTasksModule;
    }

    async manage() {
        const savedTasks = this.loadSavedTasksModule.loadTasks();
        const viewTasks = this.loadViewTasksModule.loadTasks();
        const newTasks = this.loadNewTasksModule.loadTasks();

        const tasksToSave = await this.compareTasksModule.compareTasks(await savedTasks, await viewTasks, await newTasks);

        this.updateTasksModule.updateTasks(tasksToSave);
        this.saveTasksModule.saveTasks(tasksToSave);
    }
}