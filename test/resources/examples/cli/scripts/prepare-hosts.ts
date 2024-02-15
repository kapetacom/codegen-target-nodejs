//
// GENERATED SOURCE - DO NOT EDIT
//
import * as Path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import Config from '@kapeta/sdk-config';

const BASE_PATH = Path.resolve(__dirname, '..');
const CONFIG_DIR = Path.resolve(BASE_PATH, 'config');
const HOSTS_FILE = Path.join(CONFIG_DIR, 'hosts.development.json');

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

    // Ensure the config directory exists
    await mkdir(CONFIG_DIR, { recursive: true });

    const hosts: { [key: string]: string } = {};
    for (const resource of RESOURCES) {
        const host = await config.getServiceAddress(resource.name, resource.type);
        if (host === null) {
            console.error('Failed to get host for resource: %s', resource.name);
            process.exit(1);
        }
        hosts[resource.name] = host;
    }

    await writeFile(HOSTS_FILE, JSON.stringify(hosts, null, 2), {
        flag: 'w',
    });
})()
    .then(() => {
        console.log('Hosts file written: %s', HOSTS_FILE);
    })
    .catch((e) => {
        console.error('Failed to write hosts file: %s', HOSTS_FILE, e);
        process.exit(1);
    });
