//#FILENAME:src/.generated/repository/{{snakeCase data.metadata.name}}-repository.ts:write-always
//
// GENERATED SOURCE - DO NOT EDIT
//
import {ConfigProvider, ResourceInfo, DefaultCredentials} from "@kapeta/sdk-config";

export const RESOURCE_TYPE = 'kapeta/resource-type-docker-registry';
export const PORT_TYPE = 'http';

export type Options = {
    // Base path for the repository
    path?: string

    // Base path for downloads from the repository
    downloadLocation?:string

    // Base path for uploads to the repository
    uploadLocation?:string

    // Base path for packages in the repository
    packageLocation?:string

    // Docker image name prefix
    prefix?:string
}

/**
 * Gets the connection details for the {{data.metadata.name}} docker repository.
 *
 * Use the output of this function to connect to the {{data.metadata.name}} repository.
 *
 * Docker repositories might expect Basic authentication, so you will need to provide a username and password for
 * your requests.
 * E.g. add the HTTP Header: Authentication: Basic base64(username:password)
 *
 * If the credentials are not provided, the repository is authenticated in a different way (service account, etc.)
 *
 */
export const get{{type data.metadata.name}}Details = (config: ConfigProvider):Promise<ResourceInfo<Options, DefaultCredentials> | null> => {
    return config.getResourceInfo(RESOURCE_TYPE, PORT_TYPE, '{{string data.metadata.name}}');
}
