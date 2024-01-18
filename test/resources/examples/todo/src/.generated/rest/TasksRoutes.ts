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

/**
 * Defines the types for methods and routes of the Tasks API
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
}
