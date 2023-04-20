import { Assignment } from "../../model/school/Assignment";
import { SchoolTask } from "../../model/school/SchoolTask";
import { MarkdownLoadTasks } from "../markdown/MarkdownLoadTasks";
// FORMAT: 
// - [ ] Test @due(2023-04-14) #Assignment #Class/Test #Status/not_started
//     Description: Test
//     Due Date: 4/13/2023 10:07:52 PM
export class SchoolMarkdownLoadTasks extends MarkdownLoadTasks<SchoolTask> {
    constructor(fileName: string) {
        super(fileName, /- \[[Xx\s]\] .+ @due\(.+\) #Assignment #Class\/.+ #Status\/.+\n\tDescription: .*\n\tDue Date: .*/g);
    }

    protected createTask(markdownTask: any): SchoolTask {
        const data = markdownTask.match(/- \[[Xx\s]\] (.+) @due\((.+)\) #Assignment #Class\/(.+) #Status\/(.+)\n\tDescription: (.*)\n\tDue Date: (.*)/);
        const title = data[1];
        const startDate = new Date(data[2]);
        const className = data[3];
        const status = markdownTask.match(/\[[Xx]\]/) ? 'completed' : 'not_completed';
        const description = data[5];
        const dueDate = new Date(data[6]);
        return new Assignment(title, description, status, new Date(0), dueDate, startDate, className, 0);
    }
}