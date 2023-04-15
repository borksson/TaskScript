import { SchoolTask } from "../../model/school/SchoolTask";
import { AuthenticatedWebsiteScraper } from "../AuthenticatedWebsiteScraper";

export class CanvasAuthWebScraper extends AuthenticatedWebsiteScraper<SchoolTask> {
    protected _getTasks: (authDriver: any) => Promise<SchoolTask[]> = async (authDriver: any) => {
        throw new Error("Method not implemented.");
    }
}