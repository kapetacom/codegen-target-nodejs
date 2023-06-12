import { IUsersRouteService } from "../rest/IUsersRouteService";
import { User } from "../entities/User";

export class UsersRouteService implements IUsersRouteService {
    /**
     * Create user
     * HTTP: POST /users/{id}
     */
    createUser(id: string, user: User): Promise<User> {
        throw new Error('REST resource method not implemented: "createUser"');
    }

    /**
     * Get user by id
     * HTTP: GET /users/{id}
     */
    getUser(id: string): Promise<User> {
        throw new Error('REST resource method not implemented: "getUser"');
    }

    /**
     * Delete user by id
     * HTTP: DELETE /users/{id}
     */
    deleteUser(id: string): Promise<void> {
        throw new Error('REST resource method not implemented: "deleteUser"');
    }
}
