import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Lazy-loaded components
const Login = () => import('../views/auth/Login.vue');
const Dashboard = () => import('../views/Dashboard.vue');

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guestOnly: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    
    // Check local authentication state if not verified yet
    if (authStore.authenticated === false && !to.meta.guestOnly) {
        await authStore.fetchUser();
    }

    if (to.meta.requiresAuth && !authStore.authenticated) {
        return next({ name: 'Login' });
    }

    if (to.meta.guestOnly && authStore.authenticated) {
        return next({ name: 'Dashboard' });
    }

    next();
});

export default router;