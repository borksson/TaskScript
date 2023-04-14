abstract class Task {
    title: string;
    description: string;
    status: string;

    constructor(title: string, description: string, status: string) {
        this.title = title;
        this.description = description;
        this.status = status;
    }

    abstract toString(): string;
}