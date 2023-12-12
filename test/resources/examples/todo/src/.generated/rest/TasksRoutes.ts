//
// GENERATED SOURCE - DO NOT EDIT
//
import type { RequestHandler } from 'express';
import { Task } from 'generated:entities/Task';

export interface TasksRoutes<Locals extends Record<string, any> = Record<string, any>> {
    /**
     * Add task for user
     * HTTP: POST /tasks/:userId/:id
     */
    addTask: RequestHandler<{ userId: string; id: string }, void, Task, void, Locals>;

    /**
     * Mark task as done
     * HTTP: POST /tasks/:id/done
     */
    markAsDone: RequestHandler<{ id: string }, void, void, void, Locals>;

    /**
     * Delete task
     * HTTP: DELETE /tasks/:id
     */
    removeTask: RequestHandler<{ id: string }, void, void, void, Locals>;

    /**
     *
     * HTTP: GET /tasks/:id
     */
    getTask: RequestHandler<{ id: string }, Task, void, void, Locals>;
}
