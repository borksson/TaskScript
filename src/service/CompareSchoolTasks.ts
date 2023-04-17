import { Assignment } from "../model/school/Assignment";
import { SchoolTask } from "../model/school/SchoolTask";
import { ICompareTasks } from "./interfaces/ICompareTasks";

export class CompareSchoolTasks implements ICompareTasks<SchoolTask> {
    compareTasks: (savedTasks: SchoolTask[], viewTasks: SchoolTask[], newTasks: SchoolTask[]) => Promise<SchoolTask[]> = async (savedTasks: SchoolTask[], viewTasks: SchoolTask[], newTasks: SchoolTask[]) => {
        return [new Assignment("Test", "Test", "Test", new Date(), new Date(), new Date(), "Test", 100)]
    }
}