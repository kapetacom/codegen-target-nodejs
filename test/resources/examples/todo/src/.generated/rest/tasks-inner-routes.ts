//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from 'express';
import { asyncHandler } from '@kapeta/sdk-server';
import { ConfigProvider } from '@kapeta/sdk-config';
import { restAPIMiddleware, createRESTParameterParser } from '@kapeta/sdk-rest-route';
import { createTasksInnerRouteService } from '../../service/TasksInnerRouteService';
import {
    GetTasksRequest,
    GetTasksResponse,
    RemoveTaskRequest,
    RemoveTaskResponse,
    GetTaskRequest,
    GetTaskResponse,
} from './TasksInnerRoutes';
import { json } from 'body-parser';

/**
 * creates all routes for the TasksInner API
 */
export const createTasksInnerRouter = async (configProvider: ConfigProvider) => {
    const router = Router();
    router.use(json());
    router.use(restAPIMiddleware);

    const service = await createTasksInnerRouteService(configProvider);

    // getTasks: Verify the method is available
    if (!service.getTasks) {
        throw new Error('REST resource service for "Inner" is missing method: "getTasks"');
    }

    console.log('Publishing REST method: GET /v2/tasks/');

    router.get(
        '/v2/tasks/',
        createRESTParameterParser<GetTasksRequest, GetTasksResponse>([
            { name: 'pageable', transport: 'QUERY', typeName: 'Pageable' },
        ]),
        asyncHandler(service.getTasks.bind(service))
    );

    // removeTask: Verify the method is available
    if (!service.removeTask) {
        throw new Error('REST resource service for "Inner" is missing method: "removeTask"');
    }

    console.log('Publishing REST method: DELETE /v2/tasks/:id');

    router.delete(
        '/v2/tasks/:id',
        createRESTParameterParser<RemoveTaskRequest, RemoveTaskResponse>([
            { name: 'id', transport: 'PATH', typeName: 'string' },
        ]),
        asyncHandler(service.removeTask.bind(service))
    );

    // getTask: Verify the method is available
    if (!service.getTask) {
        throw new Error('REST resource service for "Inner" is missing method: "getTask"');
    }

    console.log('Publishing REST method: GET /v2/tasks/:id');

    router.get(
        '/v2/tasks/:id',
        createRESTParameterParser<GetTaskRequest, GetTaskResponse>([
            { name: 'id', transport: 'PATH', typeName: 'string' },
        ]),
        asyncHandler(service.getTask.bind(service))
    );

    return router;
};
