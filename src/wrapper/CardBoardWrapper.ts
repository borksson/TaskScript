import { SchoolTask } from "../model/school/SchoolTask";

export class CardBoardWrapper extends SchoolTask {
    schoolTask: SchoolTask;

    constructor(schoolTask: SchoolTask) {
        super(schoolTask.title, schoolTask.description, schoolTask.status, schoolTask.completedDate, schoolTask.dueDate, schoolTask.startDate, schoolTask.className, schoolTask.grade);
        this.schoolTask = schoolTask;
    }

    toString(): string {
        const data = 
`#${this.schoolTask.getType()} #Class/${this.schoolTask.className}
    Description: ${this.schoolTask.description}
    Grade: ${this.schoolTask.grade}
    Due Date: ${this.schoolTask.dueDate.toLocaleDateString() + " " + this.schoolTask.dueDate.toLocaleTimeString()}`

        if (this.schoolTask.status === "submitted") {
            return `- [x] ${this.schoolTask.title} @completed(${this.schoolTask.completedDate.toISOString()}) ` + data;
        }
        return `- [ ] ${this.schoolTask.title} @due(${this.schoolTask.startDate.toISOString().substring(0, 10)}) ` + data;
    }

    getType(): string {
        return this.schoolTask.getType();
    }
}