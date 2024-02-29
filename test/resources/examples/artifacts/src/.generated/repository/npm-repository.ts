//
// GENERATED SOURCE - DO NOT EDIT
//
import { ConfigProvider, ResourceInfo, DefaultCredentials } from '@kapeta/sdk-config';

export const RESOURCE_TYPE = 'kapeta/resource-type-npm-repository';
export const PORT_TYPE = 'http';

/**
 * Gets the connection details for the npm NPM repository.
 *
 * Use the output of this function to connect to the npm repository.
 *
 * NPM repositories expects Basic authentication, so you will need to provide a username and password for
 * your requests.
 * E.g. add the HTTP Header: Authentication: Basic base64(username:password)
 *
 */
export const getNpmDetails = (config?: ConfigProvider): Promise<ResourceInfo<{}, DefaultCredentials> | null> => {
    return config.getResourceInfo(RESOURCE_TYPE, PORT_TYPE, 'npm');
};