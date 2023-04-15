import { SchoolTask } from "../model/school/SchoolTask";
import { ICompareTasks } from "./interfaces/ICompareTasks";

export class CompareSchoolTasks implements ICompareTasks<SchoolTask> {
    compareTasks: (savedTasks: SchoolTask[], viewTasks: SchoolTask[], newTasks: SchoolTask[]) => Promise<SchoolTask[]> = async (savedTasks: SchoolTask[], viewTasks: SchoolTask[], newTasks: SchoolTask[]) => {
        throw new Error("Method not implemented.");
    }
}