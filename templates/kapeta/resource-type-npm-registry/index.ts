//#FILENAME:src/.generated/repository/{{snakeCase data.metadata.name}}-repository.ts:write-always
//
// GENERATED SOURCE - DO NOT EDIT
//
import {ConfigProvider, ResourceInfo, DefaultCredentials} from "@kapeta/sdk-config";

export const RESOURCE_TYPE = 'kapeta/resource-type-npm-repository';
export const PORT_TYPE = 'http';

/**
 * Gets the connection details for the {{data.metadata.name}} NPM repository.
 *
 * Use the output of this function to connect to the {{data.metadata.name}} repository.
 *
 * NPM repositories might expect Basic authentication, so you will need to provide a username and password for
 * your requests.
 * E.g. add the HTTP Header: Authentication: Basic base64(username:password)
 *
 * If the credentials are not provided, the repository is authenticated in a different way (service account, etc.)
 *
 */
export const get{{type data.metadata.name}}Details = (config: ConfigProvider):Promise<ResourceInfo<{path?:string}, DefaultCredentials> | null> => {
    return config.getResourceInfo(RESOURCE_TYPE, PORT_TYPE, '{{string data.metadata.name}}');
}
