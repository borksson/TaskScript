import { Assignment } from "../model/school/Assignment";
import { SchoolTask } from "../model/school/SchoolTask";
import { ICompareTasks } from "./interfaces/ICompareTasks";

export class CompareSchoolTasks implements ICompareTasks<SchoolTask> {
    compareTasks: (savedTasks: SchoolTask[], viewTasks: SchoolTask[], newTasks: SchoolTask[]) => Promise<SchoolTask[]> = async (savedTasks: SchoolTask[], viewTasks: SchoolTask[], newTasks: SchoolTask[]) => {
        console.log("SAVED TASKS: ", savedTasks)
        console.log("VIEW TASKS: ", viewTasks)
        console.log("NEW TASKS: ", newTasks)

        let savedTasksMap = new Map<string, SchoolTask>();
        for (const task of savedTasks) {
            savedTasksMap.set(task.title, task);
        }
        for (const task of newTasks) {
            if (savedTasksMap.has(task.title)) {
                // Compare the two tasks
                console.log("COMPARE TASKS");
                let savedTask = savedTasksMap.get(task.title);
                if (savedTask) {
                    if (savedTask.status !== task.status && savedTask.status !== "completed") {
                        savedTask.status = task.status;
                        savedTask.completedDate = task.completedDate;
                    }
                    if (savedTask.dueDate !== task.dueDate) {
                        savedTask.dueDate = task.dueDate;
                        savedTask.startDate = task.startDate;
                    }
                    console.log("UPDATED SAVED TASK: ", savedTask);
                }
            }
            else {
                console.log("NEW TASK: ", task);
                savedTasks.push(task);
                savedTasksMap.set(task.title, task);
            }
        }

        for(const task of viewTasks) {
            if (savedTasksMap.has(task.title)) {
                let savedTask = savedTasksMap.get(task.title);
                if (savedTask) {
                    if (savedTask.status !== task.status) {
                        savedTask.status = task.status;
                        savedTask.completedDate = task.completedDate;
                    }
                }
            }
        }
        
        return savedTasks;
    }
}