import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../agripure/Home_farmer.vue')

        },
        {
            path: '/specialist',
            name: 'about',
            component: () => import('../agripure/Home_specialist.vue')
        }
    ]
})
export default router