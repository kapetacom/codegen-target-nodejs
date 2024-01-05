/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { ILanguageTargetProvider } from '@kapeta/ui-web-types';

// @ts-ignore
import kapetaDefinition from '../../kapeta.yml';
// @ts-ignore
import packageJson from '../../package.json';

const targetConfig: ILanguageTargetProvider = {
    kind: kapetaDefinition.metadata.name,
    version: packageJson.version,
    title: kapetaDefinition.metadata.title,
    blockKinds: ['kapeta/block-type-service'],
    resourceKinds: [
        'kapeta/resource-type-mongodb',
        'kapeta/resource-type-postgresql',
        'kapeta/resource-type-redis',
        'kapeta/resource-type-rest-api',
        'kapeta/resource-type-rest-client',
        'kapeta/resource-type-smtp-client',
        'kapeta/resource-type-auth-jwt-provider',
        'kapeta/resource-type-auth-jwt-consumer',
        'kapeta/resource-type-external-services',
    ],
    definition: kapetaDefinition,
};

export default targetConfig;
