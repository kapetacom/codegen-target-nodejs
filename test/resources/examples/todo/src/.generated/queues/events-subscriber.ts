//
// GENERATED SOURCE - DO NOT EDIT
//

import { ConfigProvider } from '@kapeta/sdk-config';
import { createConsumer, MessageHandler, ConsumerOptions } from '@kapeta/sdk-rabbitmq';
import { User } from 'generated:entities/User';

export type EventsMessageHandler = MessageHandler<User>;

export const addEventsSubscriber = async (
    config: ConfigProvider,
    consumer: EventsMessageHandler,
    options?: ConsumerOptions
) => {
    return await createConsumer<User>(config, 'events', consumer, options);
};
