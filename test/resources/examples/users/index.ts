//
// GENERATED SOURCE - DO NOT EDIT
//
import { Server } from "@kapeta/sdk-server";

import { UsersRoute } from "./src/rest/UsersRoute";
import { UsersRouteService } from "./src/service/UsersRouteService";

const server = new Server("kapeta/users", __dirname);

server.addRoute(new UsersRoute(new UsersRouteService()));

server.start("rest");
