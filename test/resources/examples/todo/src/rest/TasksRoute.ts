//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestRoute } from "@kapeta/sdk-rest-route";
import { ITasksRouteService } from "./ITasksRouteService";

export class TasksRoute extends RestRoute {
    constructor(service: ITasksRouteService) {
        super();
        this.initRoutes(service);
    }

    private initRoutes(service: ITasksRouteService) {
        //addTask: Verify the method is available
        if (!service.addTask) {
            throw new Error(
                'REST resource service for "Tasks" is missing method: "addTask"'
            );
        }

        //addTask: Verify the method is implemented correctly
        this.validateMethod(service.addTask, "addTask", [
            "userId",
            "id",
            "task",
            "overwrite",
        ]);

        //addTask: Add route to server
        this.addEndpoint({
            method: "POST",
            path: "/tasks/{userId}/{id}",
            description: "Add task for user",
            arguments: [
                { name: "userId", transport: "PATH" },
                { name: "id", transport: "PATH" },
                { name: "task", transport: "BODY" },
                { name: "overwrite", transport: "HEADER" },
            ],
            handler: service.addTask.bind(service),
        });

        //markAsDone: Verify the method is available
        if (!service.markAsDone) {
            throw new Error(
                'REST resource service for "Tasks" is missing method: "markAsDone"'
            );
        }

        //markAsDone: Verify the method is implemented correctly
        this.validateMethod(service.markAsDone, "markAsDone", ["id"]);

        //markAsDone: Add route to server
        this.addEndpoint({
            method: "POST",
            path: "/tasks/{id}/done",
            description: "Mark task as done",
            arguments: [{ name: "id", transport: "PATH" }],
            handler: service.markAsDone.bind(service),
        });

        //removeTask: Verify the method is available
        if (!service.removeTask) {
            throw new Error(
                'REST resource service for "Tasks" is missing method: "removeTask"'
            );
        }

        //removeTask: Verify the method is implemented correctly
        this.validateMethod(service.removeTask, "removeTask", ["id"]);

        //removeTask: Add route to server
        this.addEndpoint({
            method: "DELETE",
            path: "/tasks/{id}",
            description: "Delete task",
            arguments: [{ name: "id", transport: "PATH" }],
            handler: service.removeTask.bind(service),
        });

        //getTask: Verify the method is available
        if (!service.getTask) {
            throw new Error(
                'REST resource service for "Tasks" is missing method: "getTask"'
            );
        }

        //getTask: Verify the method is implemented correctly
        this.validateMethod(service.getTask, "getTask", ["id"]);

        //getTask: Add route to server
        this.addEndpoint({
            method: "GET",
            path: "/tasks/{id}",
            description: "",
            arguments: [{ name: "id", transport: "PATH" }],
            handler: service.getTask.bind(service),
        });
    }
}
