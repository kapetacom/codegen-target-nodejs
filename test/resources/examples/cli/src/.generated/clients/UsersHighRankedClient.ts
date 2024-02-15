//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient } from '@kapeta/sdk-rest-client';
import { ConfigProvider } from '@kapeta/sdk-config';
import { RestClientRequest } from '@kapeta/sdk-rest';

/**
 * Creates a new ready UsersHighRankedClient.
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export async function createUsersHighRankedClient(configProvider: ConfigProvider): Promise<UsersHighRankedClient> {
    return new UsersHighRankedClient(false).$withConfigProvider(configProvider);
}

/**
 * A client for the HighRanked API.
 *
 * Note that this client is not ready to use until it is configured with a ```ConfigProvider```.
 * This happens automatically when using the ```createUsersHighRankedClient``` function or
 * setting ```autoInit``` to true (the default).
 *
 * If you want to configure the client manually, set autoInit to false and call ```$withConfigProvider```.
 *
 * Recommended method is using ```createUsersHighRankedClient(configProvider:ConfigProvider)```;
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export class UsersHighRankedClient extends RestClient {
    constructor(autoInit: boolean = true) {
        super('HighRanked', autoInit);
    }

    /**
     *
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /high-ranked/
     */
    async getHighRankedUsers(): Promise<number[] | null> {
        const result = await this.$execute('GET', '/high-ranked/', []);

        if (result === null) {
            return null;
        }
        return result as number[];
    }

    /**
     *
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: GET /high-ranked/
     */
    getHighRankedUsersRequest(): RestClientRequest<number[] | null> {
        return this.$create('GET', '/high-ranked/', []);
    }
}
