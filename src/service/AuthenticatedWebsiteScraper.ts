import { Task } from "../../model/Task";

export abstract class AuthenticatedWebsiteScraper<T extends Task> {
    protected abstract _getTasks: (authDriver: any) => Promise<T[]>;

    public getTasks(authDriver: any): Promise<T[]> {
        return this._getTasks(authDriver);
    }
}