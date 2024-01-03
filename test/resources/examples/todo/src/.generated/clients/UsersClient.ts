//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient, RestClientRequest } from '@kapeta/sdk-rest-client';
import { User } from '../entities/User';
import { State } from '../entities/State';
import { getJWTToken } from '@kapeta/sdk-auth-jwt';

export class UsersClient extends RestClient {
    constructor() {
        super('users');
    }

    protected afterCreate(request: RestClientRequest): void {
        if (request.hasHeader('Authorization')) {
            // Do not overwrite existing authorization header
            return;
        }

        // Adds current JWT token to request if available
        const jwtToken = getJWTToken();
        if (jwtToken?.token) {
            request.withBearerToken(jwtToken.token);
        }
    }

    /**
     * Get users by id
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /users/{id}
     */
    async getUserById(id: string, metadata?: any): Promise<User | null> {
        const result = await this.$execute('GET', '/users/{id}', [
            { name: 'id', value: id, transport: 'PATH' },
            { name: 'metadata', value: metadata, transport: 'HEADER' },
        ]);

        if (result === null) {
            return null;
        }
        return result as User;
    }

    /**
     * Get users by id
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /users/{id}
     */
    getUserByIdRequest(id: string, metadata?: any): RestClientRequest<User | null> {
        return this.$create('GET', '/users/{id}', [
            { name: 'id', value: id, transport: 'PATH' },
            { name: 'metadata', value: metadata, transport: 'HEADER' },
        ]);
    }

    /**
     * Delete user by id
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /users/{id}
     */
    async deleteUser(id: string, metadata: Map<string, State>, tags: Set<string>): Promise<void> {
        await this.$execute('DELETE', '/users/{id}', [
            { name: 'id', value: id, transport: 'PATH' },
            { name: 'metadata', value: metadata, transport: 'BODY' },
            { name: 'tags', value: tags, transport: 'QUERY' },
        ]);
    }

    /**
     * Delete user by id
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /users/{id}
     */
    deleteUserRequest(id: string, metadata: Map<string, State>, tags: Set<string>): RestClientRequest<void> {
        return this.$create('DELETE', '/users/{id}', [
            { name: 'id', value: id, transport: 'PATH' },
            { name: 'metadata', value: metadata, transport: 'BODY' },
            { name: 'tags', value: tags, transport: 'QUERY' },
        ]);
    }
}
