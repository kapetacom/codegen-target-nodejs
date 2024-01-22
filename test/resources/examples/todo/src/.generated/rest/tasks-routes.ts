//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from 'express';
import { asyncHandler } from '@kapeta/sdk-server';
import { ConfigProvider } from '@kapeta/sdk-config';
import { restAPIMiddleware, createRESTParameterParser } from '@kapeta/sdk-rest-route';
import { createTasksRouteService } from '../../service/TasksRouteService';
import { json } from 'body-parser';

/**
 * creates all routes for the Tasks API
 */
export const createTasksRouter = async (configProvider: ConfigProvider) => {
    const router = Router();
    router.use(json());
    router.use(restAPIMiddleware);

    const service = await createTasksRouteService(configProvider);

    // addTask: Verify the method is available
    if (!service.addTask) {
        throw new Error('REST resource service for "Tasks" is missing method: "addTask"');
    }

    console.log('Publishing REST method: POST /tasks/:userId/:id');

    router.post(
        '/tasks/:userId/:id',
        createRESTParameterParser([
            { name: 'userId', transport: 'PATH', typeName: 'string' },
            { name: 'id', transport: 'PATH', typeName: 'string' },
            { name: 'task', transport: 'BODY', typeName: 'Task' },
        ]),
        asyncHandler(service.addTask.bind(service))
    );

    // markAsDone: Verify the method is available
    if (!service.markAsDone) {
        throw new Error('REST resource service for "Tasks" is missing method: "markAsDone"');
    }

    console.log('Publishing REST method: POST /tasks/:id/done');

    router.post(
        '/tasks/:id/done',
        createRESTParameterParser([{ name: 'id', transport: 'PATH', typeName: 'string' }]),
        asyncHandler(service.markAsDone.bind(service))
    );

    return router;
};
