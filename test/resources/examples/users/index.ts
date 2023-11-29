import { ConfigProvider, runApp } from "@kapeta/sdk-config";
import { createServer } from "./src/server";
import { createRoutes } from "generated:routes";

runApp(async (configProvider: ConfigProvider) => {
    const server = await createServer(configProvider);

    server.use(await createRoutes(configProvider));

    server.start("rest");
}, __dirname);
