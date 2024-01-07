//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from 'express';
import { asyncHandler } from '@kapeta/sdk-server';
import { ConfigProvider } from '@kapeta/sdk-config';
import { restAPIMiddleware } from '@kapeta/sdk-rest-route';
import { createUsersRouteService } from '../../service/UsersRouteService';
import { json } from 'body-parser';

/**
 * creates all routes for the users API
 */
export const createUsersRouter = async (configProvider: ConfigProvider) => {
    const router = Router();
    router.use(json());
    router.use(restAPIMiddleware);

    const service = await createUsersRouteService(configProvider);

    // createUser: Verify the method is available
    if (!service.createUser) {
        throw new Error('REST resource service for "Users" is missing method: "createUser"');
    }

    console.log('Publishing REST method: POST /users/:id');
    router.post('/users/:id', asyncHandler(service.createUser.bind(service)));

    // getUser: Verify the method is available
    if (!service.getUser) {
        throw new Error('REST resource service for "Users" is missing method: "getUser"');
    }

    console.log('Publishing REST method: GET /users/:id');
    router.get('/users/:id', asyncHandler(service.getUser.bind(service)));

    // deleteUser: Verify the method is available
    if (!service.deleteUser) {
        throw new Error('REST resource service for "Users" is missing method: "deleteUser"');
    }

    console.log('Publishing REST method: DELETE /users/:id');
    router.delete('/users/:id', asyncHandler(service.deleteUser.bind(service)));

    return router;
};
