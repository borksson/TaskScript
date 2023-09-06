import { ILoadTasks } from './interfaces/ILoadTasks';
import { ICompareTasks } from './interfaces/ICompareTasks';
import { IUpdateTasks } from './interfaces/IUpdateTasks';
import { ISaveTasks } from './interfaces/ISaveTasks';
import { Task } from '../model/Task';

export class TaskManager<T extends Task> {
    loadSavedTasksModule: ILoadTasks<T>;
    loadNewTasksModule: ILoadTasks<T> | undefined;
    loadViewTasksModule: ILoadTasks<T> | undefined;
    compareTasksModule: ICompareTasks<T>;
    updateTasksModule: IUpdateTasks<T> | undefined;
    saveTasksModule: ISaveTasks<T>;

    constructor(loadSavedTasksModule: ILoadTasks<T>, loadNewTasksModule: ILoadTasks<T> | undefined, loadViewTasksModule: ILoadTasks<T> | undefined,
        compareTasksModule: ICompareTasks<T>, updateTasksModule: IUpdateTasks<T> | undefined, saveTasksModule: ISaveTasks<T>) {
        this.loadSavedTasksModule = loadSavedTasksModule;
        this.loadNewTasksModule = loadNewTasksModule;
        this.loadViewTasksModule = loadViewTasksModule;
        this.compareTasksModule = compareTasksModule;
        this.updateTasksModule = updateTasksModule;
        this.saveTasksModule = saveTasksModule;
    }

    async manage() {
        const savedTasks = await this.loadSavedTasksModule.loadTasks();
        const viewTasks = this.loadViewTasksModule ? await this.loadViewTasksModule.loadTasks() : [];
        const newTasks = this.loadNewTasksModule ? await this.loadNewTasksModule.loadTasks() : [];

        const tasksToSave = await this.compareTasksModule.compareTasks(savedTasks, viewTasks, newTasks);

        if (this.updateTasksModule) {
            await this.updateTasksModule.updateTasks(tasksToSave);
        }
        this.saveTasksModule.saveTasks(tasksToSave);
    }
}