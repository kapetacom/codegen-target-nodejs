//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient } from '@kapeta/sdk-rest-client';
import { ConfigProvider } from '@kapeta/sdk-config';
import { RestClientRequest } from '@kapeta/sdk-rest';
import { User } from 'generated:entities/User';
import { Pageable } from '@kapeta/sdk-rest';
import { State } from 'generated:entities/State';
import { getJWTToken } from '@kapeta/sdk-auth-jwt';

/**
 * Creates a new ready UsersInnerClient.
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export async function createUsersInnerClient(configProvider: ConfigProvider): Promise<UsersInnerClient> {
    return new UsersInnerClient(false).$withConfigProvider(configProvider);
}

/**
 * A client for the Inner API.
 *
 * Note that this client is not ready to use until it is configured with a ```ConfigProvider```.
 * This happens automatically when using the ```createUsersInnerClient``` function or
 * setting ```autoInit``` to true (the default).
 *
 * If you want to configure the client manually, set autoInit to false and call ```$withConfigProvider```.
 *
 * Recommended method is using ```createUsersInnerClient(configProvider:ConfigProvider)```;
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export class UsersInnerClient extends RestClient {
    constructor(autoInit: boolean = true) {
        super('Inner', autoInit);
    }

    protected $afterCreate(request: RestClientRequest): void {
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
     * Get users
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /v2/users/
     */
    async getUsers(pageable: Pageable): Promise<User[] | null> {
        const result = await this.$execute('GET', '/v2/users/', [
            { name: 'pageable', value: pageable, transport: 'QUERY', typeName: 'Pageable' },
        ]);

        if (result === null) {
            return null;
        }
        return result as User[];
    }

    /**
     * Get users
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: GET /v2/users/
     */
    getUsersRequest(pageable: Pageable): RestClientRequest<User[] | null> {
        return this.$create('GET', '/v2/users/', [
            { name: 'pageable', value: pageable, transport: 'QUERY', typeName: 'Pageable' },
        ]);
    }

    /**
     * Get users by id
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /v2/users/{id}
     */
    async getUserById(id: string, metadata?: any): Promise<User | null> {
        const result = await this.$execute('GET', '/v2/users/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'metadata', value: metadata, transport: 'HEADER', typeName: 'any' },
        ]);

        if (result === null) {
            return null;
        }
        return result as User;
    }

    /**
     * Get users by id
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: GET /v2/users/{id}
     */
    getUserByIdRequest(id: string, metadata?: any): RestClientRequest<User | null> {
        return this.$create('GET', '/v2/users/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'metadata', value: metadata, transport: 'HEADER', typeName: 'any' },
        ]);
    }

    /**
     * Delete user by id
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /v2/users/{id}
     */
    async deleteUser(id: string, metadata: { [key: string]: State }, tags: string[]): Promise<void> {
        await this.$execute('DELETE', '/v2/users/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'metadata', value: metadata, transport: 'BODY', typeName: '{ [key:string]: State }' },
            { name: 'tags', value: tags, transport: 'QUERY', typeName: 'string[]' },
        ]);
    }

    /**
     * Delete user by id
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: DELETE /v2/users/{id}
     */
    deleteUserRequest(id: string, metadata: { [key: string]: State }, tags: string[]): RestClientRequest<void> {
        return this.$create('DELETE', '/v2/users/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'metadata', value: metadata, transport: 'BODY', typeName: '{ [key:string]: State }' },
            { name: 'tags', value: tags, transport: 'QUERY', typeName: 'string[]' },
        ]);
    }
}
