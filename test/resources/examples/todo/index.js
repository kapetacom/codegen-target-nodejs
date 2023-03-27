//
// GENERATED SOURCE - DO NOT EDIT
//
const Path = require("path");
const Server = require("@kapeta/sdk-server");

const TasksRoute = require("./src/rest/TasksRoute");
const TasksRouteService = require("./src/service/TasksRouteService");

const server = new Server("kapeta/todo", __dirname);

server.addRoute(new TasksRoute(new TasksRouteService()));

server.start();
