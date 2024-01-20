import type { Request, Response } from 'express';
import { ConfigProvider } from '@kapeta/sdk-config';
import { Task } from 'generated:entities/Task';
import { TasksRoutes } from 'generated:rest/TasksRoutes';

/**
 * Creates the TasksRouteService.
 *
 * Class is created inside the function to allow async initialization to happen. The class structure is optional
 * but just makes it easier to organize the code.
 *
 * @param configProvider The configuration provider to use.
 */
export const createTasksRouteService = async (configProvider: ConfigProvider): Promise<TasksRoutes> => {
    return {
        /**
         * Add task for user
         * HTTP: POST /tasks/:userId/:id
         */
        addTask(req, res): void {
            res.sendError('REST resource method not implemented: "addTask"', 501);
        },

        /**
         * Mark task as done
         * HTTP: POST /tasks/:id/done
         */
        markAsDone(req, res): void {
            res.sendError('REST resource method not implemented: "markAsDone"', 501);
        },
    };
};
