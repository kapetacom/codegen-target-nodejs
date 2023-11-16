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
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /users/{id}
     */
    async getUserById(id: string, metadata: any): Promise<User | null> {
        const result = await this.client.execute("GET", "/users/{id}", [
            { name: "id", value: id, transport: "PATH" },
            { name: "metadata", value: metadata, transport: "HEADER" },
        ]);

        if (result === null) {
            return null;
        }
        return result as User;
    }

    /**
     * Delete user by id
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /users/{id}
     */
    async deleteUser(
        id: string,
        metadata: Map<string, string>,
        tags: Set<string>
    ): Promise<void> {
        await this.client.execute("DELETE", "/users/{id}", [
            { name: "id", value: id, transport: "PATH" },
            { name: "metadata", value: metadata, transport: "BODY" },
            { name: "tags", value: tags, transport: "QUERY" },
        ]);
    }
}
