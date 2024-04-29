//
// GENERATED SOURCE - DO NOT EDIT
//

import { Idable } from 'generated:entities/Idable';
import { CookieOptions } from 'express';
/**
 * Task type
 */
export interface Task extends Idable {
    userId: string;
    /**
     * Name of the task
     */
    title: string;
    /**
     * Longer description
     */
    description?: string;
    /**
     * Defines if the task is done or not
     */
    done: boolean;
    /**
     * Age of the task
     */
    age?: number;
    /**
     * Created date
     */
    created: number;
    metadata: any;
    someNativeType: CookieOptions;
    details: {
        innerProp: string;
        moreDetails: {
            innerProp2: string;
        };
    };
}
