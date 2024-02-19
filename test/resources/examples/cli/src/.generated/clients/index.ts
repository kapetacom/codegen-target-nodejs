import { GamesClient } from './GamesClient';
import { UsersClient } from './UsersClient';
import { UsersHighRankedClient } from './UsersHighRankedClient';
import 'dotenv/config';

export const initRestClients = () => {
    if (!process.env.KAPETA_CONSUMER_SERVICE_GAMES_REST) {
        throw new Error('Environment varianble "KAPETA_CONSUMER_SERVICE_GAMES_REST" is not defined');
    }
    if (!process.env.KAPETA_CONSUMER_SERVICE_USERS_REST) {
        throw new Error('Environment varianble "KAPETA_CONSUMER_SERVICE_USERS_REST" is not defined');
    }
    if (!process.env.KAPETA_CONSUMER_SERVICE_USERS_REST) {
        throw new Error('Environment varianble "KAPETA_CONSUMER_SERVICE_USERS_REST" is not defined');
    }

    return {
        gamesClient: new GamesClient(false).$withBaseUrl(process.env.KAPETA_CONSUMER_SERVICE_GAMES_REST),
        usersClient: new UsersClient(false).$withBaseUrl(process.env.KAPETA_CONSUMER_SERVICE_USERS_REST),
        usersHighRankedClient: new UsersHighRankedClient(false).$withBaseUrl(
            process.env.KAPETA_CONSUMER_SERVICE_USERS_REST
        ),
    };
};
