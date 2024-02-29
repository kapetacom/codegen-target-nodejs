//
// GENERATED SOURCE - DO NOT EDIT
//
import type { Request, Response } from 'express';

export type GetRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    void,
    string,
    void,
    void,
    Locals
>;
export type GetResponse<Locals extends Record<string, any> = Record<string, any>> = Response<string, Locals>;

/**
 * Defines the types for methods and routes of the MainArtifacts API
 */
export interface MainArtifactsRoutes<Locals extends Record<string, any> = Record<string, any>> {
    /**
     *
     * HTTP: GET /artifacts/
     */
    get(req: GetRequest<Locals>, res: GetResponse<Locals>): void | Promise<void>;
}
