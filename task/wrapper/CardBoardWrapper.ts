class CardBoardWrapper extends SchoolTask {
    schoolTask: SchoolTask;

    constructor(schoolTask: SchoolTask) {
        super(schoolTask.title, schoolTask.description, schoolTask.status, schoolTask.dueDate, schoolTask.startDate, schoolTask.className, schoolTask.grade);
        this.schoolTask = schoolTask;
    }

    toString(): string {
        return `CardBoardWrapper: ${this.schoolTask.toString()}`
    }
}