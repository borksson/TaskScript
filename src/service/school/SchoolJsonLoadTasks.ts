import { Assignment } from "../../model/school/Assignment";
import { SchoolTask } from "../../model/school/SchoolTask";
import { JsonLoadTasks } from "../json/JsonLoadTasks";

export class SchoolJsonLoadTasks extends JsonLoadTasks<SchoolTask> {
    constructor(fileName: string) {
        super(fileName);
    }
    protected createTask(jsonTask: any): SchoolTask {
        return new Assignment(jsonTask.title, jsonTask.description, jsonTask.status, jsonTask.completedData, jsonTask.dueDate, jsonTask.startDate, jsonTask.className, jsonTask.grade);
    }    
}