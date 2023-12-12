//
// GENERATED SOURCE - DO NOT EDIT
//
import type { RequestHandler } from 'express';
import { User } from 'generated:entities/User';

export interface UsersRoutes<Locals extends Record<string, any> = Record<string, any>> {
    /**
     * Create user
     * HTTP: POST /users/:id
     */
    createUser: RequestHandler<{ id: string }, User, Map<string, string>, { user: User; tags: Set<string> }, Locals>;

    /**
     * Get user by id
     * HTTP: GET /users/:id
     */
    getUser: RequestHandler<{ id: string }, User, void, void, Locals>;

    /**
     * Delete user by id
     * HTTP: DELETE /users/:id
     */
    deleteUser: RequestHandler<{ id: string }, void, void, void, Locals>;
}
