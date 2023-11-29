
import type { Request, Response } from 'express';
import '@kapeta/sdk-rest-route'; // Augments Express Request and Response types
import { UsersRoutes } from 'generated:rest/UsersRoutes';
import { User } from "generated:entities/User";

export class UsersRouteService implements UsersRoutes {


        /**
        * Create user
        * HTTP: POST /users/:id
        */
        createUser( req:Request<{'id': string},User, Map<string,string>, {'user': User, 'tags': Set<string>}>, res:Response<User> ): void {
            res.sendError('REST resource method not implemented: "createUser"', 501);
        }



        /**
        * Get user by id
        * HTTP: GET /users/:id
        */
        getUser( req:Request<{'id': string},User, void, void>, res:Response<User> ): void {
            res.sendError('REST resource method not implemented: "getUser"', 501);
        }



        /**
        * Delete user by id
        * HTTP: DELETE /users/:id
        */
        deleteUser( req:Request<{'id': string},void, void, void>, res:Response<void> ): void {
            res.sendError('REST resource method not implemented: "deleteUser"', 501);
        }

}