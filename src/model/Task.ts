export abstract class Task {
    title: string;
    description: string;
    status: string;
    completedDate: Date;

    constructor(title: string, description: string, status: string, completedDate: Date) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.completedDate = completedDate;
    }

    abstract toString(): string;

    abstract getType(): string;
}