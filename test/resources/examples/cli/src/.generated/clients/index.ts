import hostsConfig from '../../../config/hosts.development.json';
import { GamesClient } from './GamesClient';
import { UsersClient } from './UsersClient';
import { UsersHighRankedClient } from './UsersHighRankedClient';

export const initRestClients = () => {
    return {
        gamesClient: new GamesClient(false).$withBaseUrl(hostsConfig.games),
        usersClient: new UsersClient(false).$withBaseUrl(hostsConfig.users),
        usersHighRankedClient: new UsersHighRankedClient(false).$withBaseUrl(hostsConfig.users),
    };
};
