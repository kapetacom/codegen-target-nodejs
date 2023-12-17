import { ConfigProvider } from '@kapeta/sdk-config';
import { Server } from '@kapeta/sdk-server';

export const createServer = (config: ConfigProvider): Server => {
    return new Server(config);
};
