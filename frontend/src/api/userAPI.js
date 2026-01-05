import api from './axios';

export const userAPI = {
    getAllUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },

    getUserById: async (id) => {
        const response = await api.get(`/users/id/${id}`);
        return response.data;
    },

    getUserByEmail: async (email) => {
        const response = await api.get(`/users/email/${email}`);
        return response.data;
    },

    getUsersByType: async (type) => {
        const response = await api.get(`/users/type/${type}`);
        return response.data;
    },

    updatePassword: async (userId, newPassword) => {
        const response = await api.put(`/users/update-password/${userId}?newPassword=${newPassword}`);
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await api.delete(`/users/delete/${id}`);
        return response.data;
    },
};

export default userAPI;
