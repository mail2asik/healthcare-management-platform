import { defineStore } from 'pinia';
import axios from 'axios';

// Ensure Axios passes session cookies with every cross-origin/SPA request
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        roles: [],
        permissions: [],
        authenticated: false,
    }),
    
    actions: {
        async getCsrfCookie() {
            await axios.get('/sanctum/csrf-cookie');
        },
        
        async login(credentials) {
            await this.getCsrfCookie();
            await axios.post('/login', credentials);
            return this.fetchUser();
        },
        
        async fetchUser() {
            try {
                const response = await axios.get('/api/v1/user');
                this.user = response.data.user;
                this.roles = response.data.roles;
                this.permissions = response.data.permissions;
                this.authenticated = true;
            } catch (error) {
                this.user = null;
                this.roles = [];
                this.permissions = [];
                this.authenticated = false;
            }
        },

        async logout() {
            await axios.post('/logout');
            this.user = null;
            this.roles = [];
            this.permissions = [];
            this.authenticated = false;
        }
    }
});