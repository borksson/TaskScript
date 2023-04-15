import { SchoolTask } from "../../model/school/SchoolTask";
import { MarkdownLoadTasks } from "../markdown/MarkdownLoadTasks";

export class SchoolMarkdownLoadTasks extends MarkdownLoadTasks<SchoolTask> {
    protected createTask(jsonTask: any): SchoolTask {
        throw new Error("Method not implemented.");
    }
}