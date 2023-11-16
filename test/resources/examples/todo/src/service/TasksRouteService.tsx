
import { ITasksRouteService } from '../rest/ITasksRouteService';
import { Task } from "../entities/Task";

export class TasksRouteService implements ITasksRouteService {


        /**
        * Add task for user
        * HTTP: POST /tasks/{userId}/{id}
        */
        addTask( userId:string, id:string, task:Task, overwrite:boolean ): Promise<void> {
            throw new Error('REST resource method not implemented: "addTask"');
        }



        /**
        * Mark task as done
        * HTTP: POST /tasks/{id}/done
        */
        markAsDone( id:string ): Promise<void> {
            throw new Error('REST resource method not implemented: "markAsDone"');
        }



        /**
        * Delete task
        * HTTP: DELETE /tasks/{id}
        */
        removeTask( id:string ): Promise<void> {
            throw new Error('REST resource method not implemented: "removeTask"');
        }



        /**
        * 
        * HTTP: GET /tasks/{id}
        */
        getTask( id:string ): Promise<Task> {
            throw new Error('REST resource method not implemented: "getTask"');
        }

}