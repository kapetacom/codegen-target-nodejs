import { Router } from 'express';
import { ConfigProvider } from '@kapeta/sdk-config';

import { createMainArtifactsRouter } from 'generated:rest/main-artifacts-routes';

export const createRoutes = async (config: ConfigProvider): Promise<Router> => {
    const routes = Router();
    routes.use(await createMainArtifactsRouter(config));
    return routes;
};
