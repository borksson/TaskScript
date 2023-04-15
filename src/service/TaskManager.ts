import { LoadTasks } from './interfaces/LoadTasks';
import { CompareTasks } from './interfaces/CompareTasks';
import { UpdateTasks } from './interfaces/UpdateTasks';
import { SaveTasks } from './interfaces/SaveTasks';
import { Task } from '../model/Task';

class TaskManager<T extends Task> {
    loadSavedTasksModule: LoadTasks<T>;
    loadNewTasksModule: LoadTasks<T>;
    loadViewTasksModule: LoadTasks<T>;
    compareTasksModule: CompareTasks<T>;
    updateTasksModule: UpdateTasks<T>;
    saveTasksModule: SaveTasks<T>;

    constructor(loadSavedTasksModule: LoadTasks<T>, loadNewTasksModule: LoadTasks<T>, loadViewTasksModule: LoadTasks<T>,
        compareTasksModule: CompareTasks<T>, updateTasksModule: UpdateTasks<T>, saveTasksModule: SaveTasks<T>) {
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