import type { Request, Response } from 'express';
import { ConfigProvider } from '@kapeta/sdk-config';
import { Task } from 'generated:entities/Task';
import { TasksInnerRoutes } from 'generated:rest/TasksInnerRoutes';

/**
 * Creates the TasksInnerRouteService.
 *
 * Class is created inside the function to allow async initialization to happen. The class structure is optional
 * but just makes it easier to organize the code.
 *
 * @param configProvider The configuration provider to use.
 */
export const createTasksInnerRouteService = async (configProvider: ConfigProvider): Promise<TasksInnerRoutes> => {
    return {
        /**
         * Delete task
         * HTTP: DELETE /v2/tasks/:id
         */
        removeTask(req, res): void {
            res.sendError('REST resource method not implemented: "removeTask"', 501);
        },

        /**
         *
         * HTTP: GET /v2/tasks/:id
         */
        getTask(req, res): void {
            res.sendError('REST resource method not implemented: "getTask"', 501);
        },
    };
};
