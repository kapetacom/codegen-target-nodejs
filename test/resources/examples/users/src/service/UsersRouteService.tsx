import type { Request, Response } from 'express';
import { ConfigProvider } from '@kapeta/sdk-config';
import { User } from 'generated:entities/User';
import { UsersRoutes } from 'generated:rest/UsersRoutes';

/**
 * Creates the UsersRouteService.
 *
 * Class is created inside the function to allow async initialization to happen. The class structure is optional
 * but just makes it easier to organize the code.
 *
 * @param configProvider The configuration provider to use.
 */
export const createUsersRouteService = async (configProvider: ConfigProvider): Promise<UsersRoutes> => {
    return {
        /**
         * Create user
         * HTTP: POST /users/:id
         */
        createUser(req, res): void {
            res.sendError('REST resource method not implemented: "createUser"', 501);
        },

        /**
         * Get user by id
         * HTTP: GET /users/:id
         */
        getUser(req, res): void {
            res.sendError('REST resource method not implemented: "getUser"', 501);
        },

        /**
         * Delete user by id
         * HTTP: DELETE /users/:id
         */
        deleteUser(req, res): void {
            res.sendError('REST resource method not implemented: "deleteUser"', 501);
        },
    };
};
