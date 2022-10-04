//
// GENERATED SOURCE - DO NOT EDIT
//
const Path = require("path");
const Server = require("@blockware/sdk-server");

const TasksRoute = require("./src/rest/TasksRoute");
const TasksRouteService = require("./src/service/TasksRouteService");

const server = new Server("Todo", __dirname);

server.addRoute(new TasksRoute(new TasksRouteService()));

server.start();
