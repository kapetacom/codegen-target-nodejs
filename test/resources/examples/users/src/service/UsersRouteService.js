class UsersRouteService {
    /**
     * Create user
     * HTTP: POST /users/{id}
     *
     * @param {string} id
     * @param {User} user
     * @return {Promise<User>}
     */
    async createUser(id, user) {
        throw new Error('REST resource method not implemented: "createUser"');
    }

    /**
     * Get user by id
     * HTTP: GET /users/{id}
     *
     * @param {string} id
     * @return {Promise<User>}
     */
    async getUser(id) {
        throw new Error('REST resource method not implemented: "getUser"');
    }

    /**
     * Delete user by id
     * HTTP: DELETE /users/{id}
     *
     * @param {string} id
     * @return {Promise<void>}
     */
    async deleteUser(id) {
        throw new Error('REST resource method not implemented: "deleteUser"');
    }
}

module.exports = UsersRouteService;
