import { SchoolTask } from "../../model/school/SchoolTask";
import { JsonLoadTasks } from "../json/JsonLoadTasks";

export class SchoolJsonLoadTasks extends JsonLoadTasks<SchoolTask> {
    constructor(fileName: string) {
        super(fileName);
    }
    protected createTask(jsonTask: any): SchoolTask {
        throw new Error("Method not implemented.");
    }    
}