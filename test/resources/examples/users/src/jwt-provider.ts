import type { RequestHandler } from "express";
import type { ConfigProvider } from "@kapeta/sdk-config";
import {
    createJWTAuthProvider,
    ensureFileKeystore,
} from "@kapeta/sdk-auth-jwt";

export const createJWTProvider = async (
    config: ConfigProvider
): Promise<RequestHandler> => {
    // TODO: Adjust this to fit your needs. This is just an example.

    const jwksStore = await ensureFileKeystore("example.jwks.json");

    return createJWTAuthProvider(
        jwksStore,
        "https://auth.example.com",
        "https://example.com"
    );
};
