import api from './axios';

export const productAPI = {
    getAllProducts: async () => {
        const response = await api.get('/products');
        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`/products/id/${id}`);
        return response.data;
    },

    getProductsByCategory: async (category) => {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    },

    addProduct: async (product) => {
        const response = await api.post('/products/add', product);
        return response.data;
    },

    deleteProduct: async (id) => {
        const response = await api.delete(`/products/delete/${id}`);
        return response.data;
    },
};

export default productAPI;
