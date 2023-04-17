import { Assignment } from "../model/school/Assignment";
import { SchoolTask } from "../model/school/SchoolTask";
import { ICompareTasks } from "./interfaces/ICompareTasks";

export class CompareSchoolTasks implements ICompareTasks<SchoolTask> {
    compareTasks: (savedTasks: SchoolTask[], viewTasks: SchoolTask[], newTasks: SchoolTask[]) => Promise<SchoolTask[]> = async (savedTasks: SchoolTask[], viewTasks: SchoolTask[], newTasks: SchoolTask[]) => {
        // console.log("SAVED TASKS: ", savedTasks)
        // console.log("VIEW TASKS: ", viewTasks)
        // console.log("NEW TASKS: ", newTasks)

        let tasksToSave: SchoolTask[] = [];
        for(const task of newTasks) {
            if(task.status != "completed") {
                tasksToSave.push(task);
            }
        }
        
        return tasksToSave;
    }
}