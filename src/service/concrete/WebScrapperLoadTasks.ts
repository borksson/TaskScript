import { Task } from "../../model/Task";
import { LoadTasks } from "./LoadTasks";

export abstract class WebScrapperLoadTasks<T extends Task> extends LoadTasks<T> {
    websiteUrl: string;

    constructor(websiteUrl: string) {
        super();
        this.websiteUrl = websiteUrl;
    }

    loadFileTasks = (): any[] => {
        const htmlString = this.loadWebsite();
        const htmlTasks = this.parseHtml(htmlString);
        return htmlTasks;
    }

    protected abstract createTask(jsonTask: any): T;

    protected abstract loadWebsite(): string;

    protected abstract parseHtml(htmlString: string): any[];
}