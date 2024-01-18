//
// GENERATED SOURCE - DO NOT EDIT
//
import type { Request, Response } from 'express';
import { User } from 'generated:entities/User';

export type CreateUserRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    { id: string },
    User,
    { [key: string]: string },
    { user: User; tags?: Set<string> },
    Locals
>;
export type CreateUserResponse<Locals extends Record<string, any> = Record<string, any>> = Response<User, Locals>;

export type GetUserRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    { id: string },
    User,
    void,
    void,
    Locals
>;
export type GetUserResponse<Locals extends Record<string, any> = Record<string, any>> = Response<User, Locals>;

export type DeleteUserRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    { id: string },
    void,
    void,
    void,
    Locals
>;
export type DeleteUserResponse<Locals extends Record<string, any> = Record<string, any>> = Response<void, Locals>;

/**
 * Defines the methods and routes for the users API
 */
export interface UsersRoutes<Locals extends Record<string, any> = Record<string, any>> {
    /**
     * Create user
     * HTTP: POST /users/:id
     */
    createUser(req: CreateUserRequest<Locals>, res: CreateUserResponse<Locals>): void | Promise<void>;

    /**
     * Get user by id
     * HTTP: GET /users/:id
     */
    getUser(req: GetUserRequest<Locals>, res: GetUserResponse<Locals>): void | Promise<void>;

    /**
     * Delete user by id
     * HTTP: DELETE /users/:id
     */
    deleteUser(req: DeleteUserRequest<Locals>, res: DeleteUserResponse<Locals>): void | Promise<void>;
}
