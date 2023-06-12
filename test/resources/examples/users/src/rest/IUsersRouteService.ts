//
// GENERATED SOURCE - DO NOT EDIT
//
import { User } from "../entities/User";

export interface IUsersRouteService {
    /**
     * Create user
     * HTTP: POST /users/{id}
     */
    createUser(id: string, user: User): Promise<User>;

    /**
     * Get user by id
     * HTTP: GET /users/{id}
     */
    getUser(id: string): Promise<User>;

    /**
     * Delete user by id
     * HTTP: DELETE /users/{id}
     */
    deleteUser(id: string): Promise<void>;
}
