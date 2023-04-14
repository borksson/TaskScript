abstract class SchoolTask extends Task {
    dueDate: Date;
    startDate: Date;
    className: string;
    grade: number;

    constructor(title: string, description: string, status: string, dueDate: Date, startDate: Date, className: string, grade: number) {
        super(title, description, status);
        this.dueDate = dueDate;
        this.startDate = startDate;
        this.className = className;
        this.grade = grade;
    }
}