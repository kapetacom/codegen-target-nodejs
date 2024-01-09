//
// GENERATED SOURCE - DO NOT EDIT
//
import type { Request, Response } from 'express';
import { Task } from 'generated:entities/Task';

export type AddTaskRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    { userId: string; id: string },
    void,
    Task,
    void,
    Locals
>;
export type AddTaskResponse<Locals extends Record<string, any> = Record<string, any>> = Response<void, Locals>;

export type MarkAsDoneRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    { id: string },
    void,
    void,
    void,
    Locals
>;
export type MarkAsDoneResponse<Locals extends Record<string, any> = Record<string, any>> = Response<void, Locals>;

export type RemoveTaskRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    { id: string },
    void,
    void,
    void,
    Locals
>;
export type RemoveTaskResponse<Locals extends Record<string, any> = Record<string, any>> = Response<void, Locals>;

export type GetTaskRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    { id: string },
    Task,
    void,
    void,
    Locals
>;
export type GetTaskResponse<Locals extends Record<string, any> = Record<string, any>> = Response<Task, Locals>;

/**
 * Defines the methods and routes for the tasks API
 */
export interface TasksRoutes<Locals extends Record<string, any> = Record<string, any>> {
    /**
     * Add task for user
     * HTTP: POST /tasks/:userId/:id
     */
    addTask(req: AddTaskRequest<Locals>, res: AddTaskResponse<Locals>): void | Promise<void>;

    /**
     * Mark task as done
     * HTTP: POST /tasks/:id/done
     */
    markAsDone(req: MarkAsDoneRequest<Locals>, res: MarkAsDoneResponse<Locals>): void | Promise<void>;

    /**
     * Delete task
     * HTTP: DELETE /tasks/:id
     */
    removeTask(req: RemoveTaskRequest<Locals>, res: RemoveTaskResponse<Locals>): void | Promise<void>;

    /**
     *
     * HTTP: GET /tasks/:id
     */
    getTask(req: GetTaskRequest<Locals>, res: GetTaskResponse<Locals>): void | Promise<void>;
}
