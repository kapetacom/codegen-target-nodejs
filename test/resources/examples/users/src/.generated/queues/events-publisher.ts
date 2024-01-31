//
// GENERATED SOURCE - DO NOT EDIT
//

import { ConfigProvider } from '@kapeta/sdk-config';
import { PublisherOptions, createPublisher } from '@kapeta/sdk-rabbitmq';
import { User } from 'generated:entities/User';

export enum EventsRoutingKey {
    USER_CREATED = 'user.created',
    USER_UPDATED = 'user.updated',
    USER_DELETED = 'user.deleted',
}

export interface EventsHeaders {
    'Some-Header': 'value1' | 'value2' | 'value3';
    'Other-Header': 'other1' | 'other2';
}

export const createEventsPublisher = async (config: ConfigProvider, options?: PublisherOptions) => {
    return await createPublisher<User, EventsHeaders, EventsRoutingKey>(config, 'events', options);
};
