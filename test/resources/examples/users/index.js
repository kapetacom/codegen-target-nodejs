//
// GENERATED SOURCE - DO NOT EDIT
//
const Path = require("path");
const Server = require("@blockware/sdk-server");

const UsersRoute = require("./src/rest/UsersRoute");
const UsersRouteService = require("./src/service/UsersRouteService");

const server = new Server("Users", __dirname);

server.addRoute(new UsersRoute(new UsersRouteService()));

server.start();
