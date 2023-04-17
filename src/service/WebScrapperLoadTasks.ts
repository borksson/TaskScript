import { Task } from "../model/Task";
import { AuthenticatedWebsiteScraper } from "./AuthenticatedWebsiteScraper";
import { ILoadTasks } from "./interfaces/ILoadTasks";

export abstract class WebScrapperLoadTasks<T extends Task, W extends AuthenticatedWebsiteScraper<T>> implements ILoadTasks<T> {
    websites: W[];
    authDriver: any;

    constructor(websites: W[]) {
        this.websites = websites;
    }

    loadTasks = async () => {
        try {
            await this.authenticate();
            let webTasks = [];
            // Load tasks from each website
            for (const website of this.websites) {
                // Load tasks
                const tasks = await website.getTasks(this.authDriver);
                // Add tasks to webTasks
                webTasks.push(...tasks);
            }

            this.authDriver.quit();

            return webTasks;
        } catch (error) {
            console.log(error);
            this.authDriver.quit();
            throw error;
        }
    }



    protected abstract authenticate(): Promise<void>;
}