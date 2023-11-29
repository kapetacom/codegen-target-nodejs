import { Router } from "express";
import { ConfigProvider } from "@kapeta/sdk-config";
import { createJWTProvider } from "../jwt-provider";

import { createUsersRouter } from "generated:rest/users-routes";

export const createRoutes = async (config: ConfigProvider): Promise<Router> => {
    const routes = Router();
    routes.use(await createJWTProvider(config));
    routes.use(createUsersRouter());
    return routes;
};
