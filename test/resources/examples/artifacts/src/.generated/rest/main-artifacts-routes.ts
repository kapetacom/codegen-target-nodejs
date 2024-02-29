//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from 'express';
import { asyncHandler } from '@kapeta/sdk-server';
import { ConfigProvider } from '@kapeta/sdk-config';
import { restAPIMiddleware, createRESTParameterParser } from '@kapeta/sdk-rest-route';
import { createMainArtifactsRouteService } from '../../service/MainArtifactsRouteService';
import { GetRequest, GetResponse } from './MainArtifactsRoutes';
import { json } from 'body-parser';

/**
 * creates all routes for the MainArtifacts API
 */
export const createMainArtifactsRouter = async (configProvider: ConfigProvider) => {
    const router = Router();
    router.use(json());
    router.use(restAPIMiddleware);

    const service = await createMainArtifactsRouteService(configProvider);

    // get: Verify the method is available
    if (!service.get) {
        throw new Error('REST resource service for "Artifacts" is missing method: "get"');
    }

    console.log('Publishing REST method: GET /artifacts/');

    router.get(
        '/artifacts/',
        createRESTParameterParser<GetRequest, GetResponse>([]),
        asyncHandler(service.get.bind(service))
    );

    return router;
};
