import { Router } from 'express';
import { ConfigProvider } from '@kapeta/sdk-config';
import { createAuthMiddleware } from 'generated:auth/auth-middleware';

import { createUsersRouter } from 'generated:rest/users-routes';

export const createRoutes = async (config: ConfigProvider): Promise<Router> => {
    const routes = Router();
    routes.use(await createAuthMiddleware(config));
    routes.use(await createUsersRouter(config));
    return routes;
};
