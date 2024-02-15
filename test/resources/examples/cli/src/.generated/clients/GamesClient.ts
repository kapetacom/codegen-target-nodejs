//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient } from '@kapeta/sdk-rest-client';
import { ConfigProvider } from '@kapeta/sdk-config';
import { RestClientRequest } from '@kapeta/sdk-rest';
import { Game } from 'generated:entities/Game';

/**
 * Creates a new ready GamesClient.
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export async function createGamesClient(configProvider: ConfigProvider): Promise<GamesClient> {
    return new GamesClient(false).$withConfigProvider(configProvider);
}

/**
 * A client for the games API.
 *
 * Note that this client is not ready to use until it is configured with a ```ConfigProvider```.
 * This happens automatically when using the ```createGamesClient``` function or
 * setting ```autoInit``` to true (the default).
 *
 * If you want to configure the client manually, set autoInit to false and call ```$withConfigProvider```.
 *
 * Recommended method is using ```createGamesClient(configProvider:ConfigProvider)```;
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export class GamesClient extends RestClient {
    constructor(autoInit: boolean = true) {
        super('games', autoInit);
    }

    /**
     *
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /games
     */
    async getGames(): Promise<Game[] | null> {
        const result = await this.$execute('GET', '/games', []);

        if (result === null) {
            return null;
        }
        return result as Game[];
    }

    /**
     *
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: GET /games
     */
    getGamesRequest(): RestClientRequest<Game[] | null> {
        return this.$create('GET', '/games', []);
    }
}
