//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient } from "@kapeta/sdk-rest-client";
import { User } from "../entities/User";

export class UsersClient {
    private readonly client: RestClient;

    constructor() {
        this.client = new RestClient("users");
    }

    /**
     * Get users by id
     * HTTP: GET /users/{id}
     */
    getUserById(id: string): Promise<User> {
        return this.client.execute("GET", "/users/{id}", [
            { name: "id", value: id, transport: "PATH" },
        ]);
    }

    /**
     * Delete user by id
     * HTTP: DELETE /users/{id}
     */
    deleteUser(id: string): Promise<void> {
        return this.client.execute("DELETE", "/users/{id}", [
            { name: "id", value: id, transport: "PATH" },
        ]);
    }
}
