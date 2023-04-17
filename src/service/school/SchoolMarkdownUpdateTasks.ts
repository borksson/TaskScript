import { SchoolTask } from "../../model/school/SchoolTask";
import { MarkdownUpdateTasks } from "../markdown/MarkdownUpdateTasks";

export class SchoolMarkdownUpdateTasks extends MarkdownUpdateTasks<SchoolTask> {
    protected createMarkdownTask(task: SchoolTask): string {
        return '- [ ] TEST TASK'
    }
}