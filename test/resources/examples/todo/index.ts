//
// GENERATED SOURCE - DO NOT EDIT
//
import { Server } from "@kapeta/sdk-server";

import { TasksRoute } from "./src/rest/TasksRoute";
import { TasksRouteService } from "./src/service/TasksRouteService";

const server = new Server("kapeta/todo", __dirname);

server.addRoute(new TasksRoute(new TasksRouteService()));

server.start();
