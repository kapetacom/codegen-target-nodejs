import type { Request, Response } from 'express';
import { ConfigProvider } from '@kapeta/sdk-config';
import { TasksRoutes } from 'generated:rest/TasksRoutes';
import { Task } from 'generated:entities/Task';

/**
 * Creates the TasksRouteService.
 *
 * Class is created inside the function to allow async initialization to happen. The class structure is optional
 * but just makes it easier to organize the code.
 *
 * @param configProvider The configuration provider to use.
 */
export const createTasksRouteService = async (configProvider: ConfigProvider): Promise<TasksRoutes> => {
    /**
     * Defines the implementation of all routes for the tasks API
     */
    class TasksRouteService implements TasksRoutes {
        /**
         * Add task for user
         * HTTP: POST /tasks/:userId/:id
         */
        addTask(req: Request<{ userId: string; id: string }, void, Task, void>, res: Response<void>): void {
            res.sendError('REST resource method not implemented: "addTask"', 501);
        }

        /**
         * Mark task as done
         * HTTP: POST /tasks/:id/done
         */
        markAsDone(req: Request<{ id: string }, void, void, void>, res: Response<void>): void {
            res.sendError('REST resource method not implemented: "markAsDone"', 501);
        }

        /**
         * Delete task
         * HTTP: DELETE /tasks/:id
         */
        removeTask(req: Request<{ id: string }, void, void, void>, res: Response<void>): void {
            res.sendError('REST resource method not implemented: "removeTask"', 501);
        }

        /**
         *
         * HTTP: GET /tasks/:id
         */
        getTask(req: Request<{ id: string }, Task, void, void>, res: Response<Task>): void {
            res.sendError('REST resource method not implemented: "getTask"', 501);
        }
    }

    return new TasksRouteService();
};
