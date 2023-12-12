//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from "express";
import { asyncHandler } from "@kapeta/sdk-server";
import { restAPIMiddleware } from "@kapeta/sdk-rest-route";
import { UsersRouteService } from "../../service/UsersRouteService";
import { json } from "body-parser";
export const createUsersRouter = () => {
    const router = Router();
    router.use(json());
    router.use(restAPIMiddleware);

    const service = new UsersRouteService();

    // createUser: Verify the method is available
    if (!service.createUser) {
        throw new Error(
            'REST resource service for "Users" is missing method: "createUser"'
        );
    }

    console.log("Publishing REST method: POST /users/:id");
    router.post("/users/:id", asyncHandler(service.createUser.bind(service)));

    // getUser: Verify the method is available
    if (!service.getUser) {
        throw new Error(
            'REST resource service for "Users" is missing method: "getUser"'
        );
    }

    console.log("Publishing REST method: GET /users/:id");
    router.get("/users/:id", asyncHandler(service.getUser.bind(service)));

    // deleteUser: Verify the method is available
    if (!service.deleteUser) {
        throw new Error(
            'REST resource service for "Users" is missing method: "deleteUser"'
        );
    }

    console.log("Publishing REST method: DELETE /users/:id");
    router.delete("/users/:id", asyncHandler(service.deleteUser.bind(service)));

    return router;
};
