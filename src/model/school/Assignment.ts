import { SchoolTask } from "./SchoolTask";

export class Assignment extends SchoolTask {
    constructor(title: string, description: string, status: string, completedDate: Date, dueDate: Date, startDate: Date, className: string, grade: number) {
        super(title, description, status, completedDate, dueDate, startDate, className, grade);
    }

    toString(): string {
        throw new Error("Method not implemented.");
    }

    getType(): string {
        return "Assignment";
    }
}

