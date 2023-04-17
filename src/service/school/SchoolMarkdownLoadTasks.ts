import { Assignment } from "../../model/school/Assignment";
import { SchoolTask } from "../../model/school/SchoolTask";
import { MarkdownLoadTasks } from "../markdown/MarkdownLoadTasks";

export class SchoolMarkdownLoadTasks extends MarkdownLoadTasks<SchoolTask> {
    protected createTask(jsonTask: any): SchoolTask {
        return new Assignment("Test", "Test", "Test", new Date(), new Date(), new Date(), "Test", 100)
    }
}