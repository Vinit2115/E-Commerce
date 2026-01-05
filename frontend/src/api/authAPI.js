import api from './axios';

export const authAPI = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', {
            userEmail: email,
            userPassword: password,
        });
        return response.data;
    },

    register: async (name, email, password) => {
        const response = await api.post('/auth/register', {
            userName: name,
            userEmail: email,
            userPassword: password,
        });
        return response.data;
    },
};

export default authAPI;
