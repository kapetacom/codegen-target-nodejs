//
// GENERATED SOURCE - DO NOT EDIT
//
import { Task } from "../entities/Task";

export interface ITasksRouteService {
    /**
     * Add task for user
     * HTTP: POST /tasks/{userId}/{id}
     */
    addTask(
        userId: string,
        id: string,
        task: Task,
        overwrite: boolean
    ): Promise<void>;

    /**
     * Mark task as done
     * HTTP: POST /tasks/{id}/done
     */
    markAsDone(id: string): Promise<void>;

    /**
     * Delete task
     * HTTP: DELETE /tasks/{id}
     */
    removeTask(id: string): Promise<void>;

    /**
     *
     * HTTP: GET /tasks/{id}
     */
    getTask(id: string): Promise<Task>;
}
