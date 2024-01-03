import { ensureFileKeystore, JWTKeyStoreInternal } from '@kapeta/sdk-auth-jwt';

export const createProviderKeyStore = async () => {
    const jwtConfig = {
        issuer: 'https://example.auth.kapeta.com',
        audience: 'https://example.kapeta.com',
        file: 'jwks.json',
    };

    const jwksStore = await ensureFileKeystore(jwtConfig.file);
    return new JWTKeyStoreInternal(jwksStore, jwtConfig.issuer, jwtConfig.audience);
};
