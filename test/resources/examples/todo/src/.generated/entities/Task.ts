//
// GENERATED SOURCE - DO NOT EDIT
//

/**
 * Task type
 */
export interface Task {
    /**
     * Primary ID of task
     */
    id: string;
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
}
