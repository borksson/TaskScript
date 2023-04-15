import { TaskManager } from "./src/service/TaskManager";
import { CompareSchoolTasks } from "./src/service/CompareSchoolTasks";
import { ByuWebScrapperLoadTasks } from "./src/service/byu/ByuWebScrapperLoadTasks";
import { SchoolJsonLoadTasks } from "./src/service/school/SchoolJsonLoadTasks";
import { SchoolMarkdownLoadTasks } from "./src/service/school/SchoolMarkdownLoadTasks";
import { SchoolMarkdownUpdateTasks } from "./src/service/school/SchoolMarkdownUpdateTasks";
import { JsonSaveTasks } from "./src/service/json/JsonSaveTasks";

const main = async () => {
    const loadSavedTasksModule = new SchoolJsonLoadTasks("test.json");
    const loadNewTasksModule = new ByuWebScrapperLoadTasks([]);
    const loadViewTasksModule = new SchoolMarkdownLoadTasks("test.md");
    const compareTasksModule = new CompareSchoolTasks();
    const updateTasksModule = new SchoolMarkdownUpdateTasks("test.md");
    const saveTasksModule = new JsonSaveTasks("test.json");

    const taskManager = new TaskManager(loadSavedTasksModule, loadNewTasksModule, 
        loadViewTasksModule, compareTasksModule, updateTasksModule, saveTasksModule);

    await taskManager.manage();

}

main();