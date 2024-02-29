import { ConfigProvider } from '@kapeta/sdk-config';
import { MainArtifactsRoutes } from 'generated:rest/MainArtifactsRoutes';

/**
 * Creates the MainArtifactsRouteService.
 *
 * Class is created inside the function to allow async initialization to happen. The class structure is optional
 * but just makes it easier to organize the code.
 *
 * @param configProvider The configuration provider to use.
 */
export const createMainArtifactsRouteService = async (configProvider: ConfigProvider): Promise<MainArtifactsRoutes> => {
    return {
        /**
         *
         * HTTP: GET /artifacts/
         */
        get(req, res): void {
            res.sendError('REST resource method not implemented: "get"', 501);
        },
    };
};
