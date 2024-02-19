//
// GENERATED SOURCE - DO NOT EDIT
//
import * as Path from 'path';
import { writeFile } from 'fs/promises';
import Config from '@kapeta/sdk-config';

const BASE_PATH = Path.resolve(__dirname, '..');
const ENV_FILE = Path.join(BASE_PATH, '.env.development');

const RESOURCES = [
    {
        name: 'games',
        type: 'rest',
    },
    {
        name: 'users',
        type: 'rest',
    },
];

(async function () {
    const config = await Config.init(BASE_PATH);

    let envContents = '';
    for (const resource of RESOURCES) {
        const host = await config.getServiceAddress(resource.name, resource.type);
        if (host === null) {
            console.error('Failed to get host for resource: %s', resource.name);
            process.exit(1);
        }
        // Convert each resource into an environment variable declaration
        envContents += `KAPETA_CONSUMER_SERVICE_${resource.name.toUpperCase()}_${resource.type.toUpperCase()}="${host}"\n`;
    }

    await writeFile(ENV_FILE, envContents.trim(), {
        flag: 'w',
    });
})()
    .then(() => {
        console.log('Env file written: %s', ENV_FILE);
    })
    .catch((e) => {
        console.error('Failed to write env file: %s', ENV_FILE, e);
        process.exit(1);
    });
