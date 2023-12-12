//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from 'express';
import { asyncHandler } from '@kapeta/sdk-server';
import { restAPIMiddleware } from '@kapeta/sdk-rest-route';
import { TasksRouteService } from '../../service/TasksRouteService';
import { json } from 'body-parser';
export const createTasksRouter = () => {
    const router = Router();
    router.use(json());
    router.use(restAPIMiddleware);

    const service = new TasksRouteService();

    // addTask: Verify the method is available
    if (!service.addTask) {
        throw new Error('REST resource service for "Tasks" is missing method: "addTask"');
    }

    console.log('Publishing REST method: POST /tasks/:userId/:id');
    router.post('/tasks/:userId/:id', asyncHandler(service.addTask.bind(service)));

    // markAsDone: Verify the method is available
    if (!service.markAsDone) {
        throw new Error('REST resource service for "Tasks" is missing method: "markAsDone"');
    }

    console.log('Publishing REST method: POST /tasks/:id/done');
    router.post('/tasks/:id/done', asyncHandler(service.markAsDone.bind(service)));

    // removeTask: Verify the method is available
    if (!service.removeTask) {
        throw new Error('REST resource service for "Tasks" is missing method: "removeTask"');
    }

    console.log('Publishing REST method: DELETE /tasks/:id');
    router.delete('/tasks/:id', asyncHandler(service.removeTask.bind(service)));

    // getTask: Verify the method is available
    if (!service.getTask) {
        throw new Error('REST resource service for "Tasks" is missing method: "getTask"');
    }

    console.log('Publishing REST method: GET /tasks/:id');
    router.get('/tasks/:id', asyncHandler(service.getTask.bind(service)));

    return router;
};
