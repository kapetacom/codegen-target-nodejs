import { ensureFileKeystore, JWTKeyStoreInternal } from '@kapeta/sdk-auth-jwt';

export const createProviderKeyStore = async () => {
    const jwtConfig = {
        issuer: 'https://todo-sample-auth.kapeta.com',
        audience: 'https://todo-sample.kapeta.com',
        file: 'jwks.json',
    };

    const jwksStore = await ensureFileKeystore(jwtConfig.file);
    return new JWTKeyStoreInternal(jwksStore, jwtConfig.issuer, jwtConfig.audience);
};
