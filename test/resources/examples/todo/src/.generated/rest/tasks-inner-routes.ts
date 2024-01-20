//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from 'express';
import { asyncHandler } from '@kapeta/sdk-server';
import { ConfigProvider } from '@kapeta/sdk-config';
import { restAPIMiddleware } from '@kapeta/sdk-rest-route';
import { createTasksInnerRouteService } from '../../service/TasksInnerRouteService';
import { json } from 'body-parser';

/**
 * creates all routes for the TasksInner API
 */
export const createTasksInnerRouter = async (configProvider: ConfigProvider) => {
    const router = Router();
    router.use(json());
    router.use(restAPIMiddleware);

    const service = await createTasksInnerRouteService(configProvider);

    // removeTask: Verify the method is available
    if (!service.removeTask) {
        throw new Error('REST resource service for "Inner" is missing method: "removeTask"');
    }

    console.log('Publishing REST method: DELETE /v2/tasks/:id');
    router.delete('/v2/tasks/:id', asyncHandler(service.removeTask.bind(service)));

    // getTask: Verify the method is available
    if (!service.getTask) {
        throw new Error('REST resource service for "Inner" is missing method: "getTask"');
    }

    console.log('Publishing REST method: GET /v2/tasks/:id');
    router.get('/v2/tasks/:id', asyncHandler(service.getTask.bind(service)));

    return router;
};
