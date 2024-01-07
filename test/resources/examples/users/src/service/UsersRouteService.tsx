import type { Request, Response } from 'express';
import { ConfigProvider } from '@kapeta/sdk-config';
import { UsersRoutes } from 'generated:rest/UsersRoutes';
import { User } from 'generated:entities/User';

/**
 * Creates the UsersRouteService.
 *
 * Class is created inside the function to allow async initialization to happen. The class structure is optional
 * but just makes it easier to organize the code.
 *
 * @param configProvider The configuration provider to use.
 */
export const createUsersRouteService = async (configProvider: ConfigProvider): Promise<UsersRoutes> => {
    /**
     * Defines the implementation of all routes for the users API
     */
    class UsersRouteService implements UsersRoutes {
        /**
         * Create user
         * HTTP: POST /users/:id
         */
        createUser(
            req: Request<{ id: string }, User, Map<string, string>, { user: User; tags?: Set<string> }>,
            res: Response<User>
        ): void {
            res.sendError('REST resource method not implemented: "createUser"', 501);
        }

        /**
         * Get user by id
         * HTTP: GET /users/:id
         */
        getUser(req: Request<{ id: string }, User, void, void>, res: Response<User>): void {
            res.sendError('REST resource method not implemented: "getUser"', 501);
        }

        /**
         * Delete user by id
         * HTTP: DELETE /users/:id
         */
        deleteUser(req: Request<{ id: string }, void, void, void>, res: Response<void>): void {
            res.sendError('REST resource method not implemented: "deleteUser"', 501);
        }
    }

    return new UsersRouteService();
};
