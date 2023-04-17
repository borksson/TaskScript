import { Task } from "../model/Task";

export abstract class AuthenticatedWebsiteScraper<T extends Task> {
    websiteUrl: string;

    constructor(websiteUrl: string) {
        this.websiteUrl = websiteUrl;
    }

    protected abstract _getTasks: (authDriver: any) => Promise<T[]>;

    public getTasks(authDriver: any): Promise<T[]> {
        return this._getTasks(authDriver);
    }
}