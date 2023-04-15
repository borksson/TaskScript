import { Task } from "../../model/Task";
import { AuthenticatedWebsiteScraper } from "./AuthenticatedWebsiteScraper";
import { LoadTasks } from "./LoadTasks";

export abstract class WebScrapperLoadTasks<T extends Task, W extends AuthenticatedWebsiteScraper<T>> extends LoadTasks<T> {
    websites: W[];
    authDriver: any;

    constructor(websites: W[], authDriver: any) {
        super();
        this.websites = websites;
        this.authDriver = authDriver;
    }

    loadFileTasks = async () => {
        this.authDriver = await this.authenticate();
        let webTasks = [];
        // Load tasks from each website
        for (const website of this.websites) {
            // Load tasks
            const tasks = await website.getTasks(this.authDriver);
            // Add tasks to webTasks
            webTasks.push(...tasks);
        }
        return webTasks;
    }

    protected abstract authenticate(): Promise<any>;
}