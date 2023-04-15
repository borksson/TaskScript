import { SchoolTask } from "../../../model/school/SchoolTask";
import { AuthenticatedWebsiteScraper } from "../AuthenticatedWebsiteScraper";
import { WebScrapperLoadTasks } from "../WebScrapperLoadTasks";

export class ByuWebScrapperLoadTasks extends WebScrapperLoadTasks<SchoolTask, AuthenticatedWebsiteScraper<SchoolTask>> {
    protected createTask(jsonTask: any): SchoolTask {
        throw new Error("Method not implemented.");
    }
    protected authenticate(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}