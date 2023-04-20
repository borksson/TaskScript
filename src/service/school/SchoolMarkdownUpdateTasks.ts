import { SchoolTask } from "../../model/school/SchoolTask";
import { MarkdownUpdateTasks } from "../markdown/MarkdownUpdateTasks";

import { format } from 'date-fns'
// FORMAT: 
// - [ ] Test @due(2023-04-14) #Assignment #Class/Test #Status/not_started
//     Description: Test
//     Due Date: 4/13/2023 10:07:52 PM
export class SchoolMarkdownUpdateTasks extends MarkdownUpdateTasks<SchoolTask> {
    protected createMarkdownTask(task: SchoolTask): string {
        return `- [ ] ${task.title} @due(${format(new Date(task.startDate), 'yyyy-MM-dd')}) #Assignment #Class/${task.className} #Status/${task.status}\n\tDescription: ${task.description}\n\tDue Date: ${format(new Date(task.dueDate), 'MM/dd/yyyy h:mm a')}`;
    }
}