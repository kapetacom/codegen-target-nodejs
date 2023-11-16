//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestRoute } from "@kapeta/sdk-rest-route";
import { IUsersRouteService } from "./IUsersRouteService";

export class UsersRoute extends RestRoute {
    constructor(service: IUsersRouteService) {
        super();
        this.initRoutes(service);
    }

    private initRoutes(service: IUsersRouteService) {
        //createUser: Verify the method is available
        if (!service.createUser) {
            throw new Error(
                'REST resource service for "Users" is missing method: "createUser"'
            );
        }

        //createUser: Verify the method is implemented correctly
        this.validateMethod(service.createUser, "createUser", [
            "id",
            "user",
            "metadata",
            "tags",
        ]);

        //createUser: Add route to server
        this.addEndpoint({
            method: "POST",
            path: "/users/{id}",
            description: "Create user",
            arguments: [
                { name: "id", transport: "PATH" },
                { name: "user", transport: "QUERY" },
                { name: "metadata", transport: "BODY" },
                { name: "tags", transport: "QUERY" },
            ],
            handler: service.createUser.bind(service),
        });

        //getUser: Verify the method is available
        if (!service.getUser) {
            throw new Error(
                'REST resource service for "Users" is missing method: "getUser"'
            );
        }

        //getUser: Verify the method is implemented correctly
        this.validateMethod(service.getUser, "getUser", ["id", "metadata"]);

        //getUser: Add route to server
        this.addEndpoint({
            method: "GET",
            path: "/users/{id}",
            description: "Get user by id",
            arguments: [
                { name: "id", transport: "PATH" },
                { name: "metadata", transport: "HEADER" },
            ],
            handler: service.getUser.bind(service),
        });

        //deleteUser: Verify the method is available
        if (!service.deleteUser) {
            throw new Error(
                'REST resource service for "Users" is missing method: "deleteUser"'
            );
        }

        //deleteUser: Verify the method is implemented correctly
        this.validateMethod(service.deleteUser, "deleteUser", ["id"]);

        //deleteUser: Add route to server
        this.addEndpoint({
            method: "DELETE",
            path: "/users/{id}",
            description: "Delete user by id",
            arguments: [{ name: "id", transport: "PATH" }],
            handler: service.deleteUser.bind(service),
        });
    }
}
