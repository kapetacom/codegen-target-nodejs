//
// GENERATED SOURCE - DO NOT EDIT
//
import type { Request, Response } from 'express';
import { Task } from 'generated:entities/Task';
import { Pageable } from '@kapeta/sdk-rest';

export type GetTasksRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    void,
    Task[],
    void,
    { pageable: Pageable },
    Locals
>;
export type GetTasksResponse<Locals extends Record<string, any> = Record<string, any>> = Response<Task[], Locals>;

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
 * Defines the types for methods and routes of the TasksInner API
 */
export interface TasksInnerRoutes<Locals extends Record<string, any> = Record<string, any>> {
    /**
     * Get users
     * HTTP: GET /v2/tasks/
     */
    getTasks(req: GetTasksRequest<Locals>, res: GetTasksResponse<Locals>): void | Promise<void>;

    /**
     * Delete task
     * HTTP: DELETE /v2/tasks/:id
     */
    removeTask(req: RemoveTaskRequest<Locals>, res: RemoveTaskResponse<Locals>): void | Promise<void>;

    /**
     *
     * HTTP: GET /v2/tasks/:id
     */
    getTask(req: GetTaskRequest<Locals>, res: GetTaskResponse<Locals>): void | Promise<void>;
}
