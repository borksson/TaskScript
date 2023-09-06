import { Assignment } from "../../model/school/Assignment";
import { SchoolTask } from "../../model/school/SchoolTask";
import { JsonRequestLoadTasks } from "../json/JsonRequestLoadTasks";

export class SchoolJsonRequestLoadTasks extends JsonRequestLoadTasks<SchoolTask> {
    constructor(req: any) {
        super(req);
    }
    protected createTask(jsonTask: any): SchoolTask {
        return new Assignment(jsonTask.title, jsonTask.description, jsonTask.status, jsonTask.completedData, jsonTask.dueDate, jsonTask.startDate, jsonTask.className, jsonTask.grade);
    }    
}