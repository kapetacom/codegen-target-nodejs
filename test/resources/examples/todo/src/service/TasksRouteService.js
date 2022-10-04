class TasksRouteService {
    /**
     * Add task for user
     * HTTP: POST /tasks/{userId}/{id}
     *
     * @param {string} userId
     * @param {string} id
     * @param {Task} task
     * @return {Promise<void>}
     */
    async addTask(userId, id, task) {
        throw new Error('REST resource method not implemented: "addTask"');
    }

    /**
     * Mark task as done
     * HTTP: POST /tasks/{id}/done
     *
     * @param {string} id
     * @return {Promise<void>}
     */
    async markAsDone(id) {
        throw new Error('REST resource method not implemented: "markAsDone"');
    }

    /**
     * Delete task
     * HTTP: DELETE /tasks/{id}
     *
     * @param {string} id
     * @return {Promise<void>}
     */
    async removeTask(id) {
        throw new Error('REST resource method not implemented: "removeTask"');
    }

    /**
     * Get task by id
     * HTTP: GET /tasks/{id}
     *
     * @param {string} id
     * @return {Promise<Task>}
     */
    async getTask(id) {
        throw new Error('REST resource method not implemented: "getTask"');
    }
}

module.exports = TasksRouteService;
