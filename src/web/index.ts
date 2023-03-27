import {TargetConfig} from "@kapeta/ui-web-types";

// @ts-ignore
const kapetaDefinition = require('../../kapeta.yml');
const packageJson = require('../../package.json');

const targetConfig : TargetConfig =  {
    kind: kapetaDefinition.metadata.name,
    version: packageJson.version,
    title: kapetaDefinition.metadata.title,
    blockKinds:[
        'kapeta/block-type-service'
    ]
};

export default targetConfig;
