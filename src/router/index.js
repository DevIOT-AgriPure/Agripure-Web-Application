import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/sign-in',
        },
        {
            path: '/sign-in',
            name: 'signIn',
            component: () => import('../agripure/security/signIn.vue')
        },
        {
            path: '/sign-up',
            name: 'signUp',
            component: () => import('../agripure/security/signUp.vue')
        },
        {
            path: '/farmer/cropInventory',
            name: 'cropInventory',
            component: () => import('../agripure/farmer/crop_inventory.vue')
        },
        {
            path: '/specialist',
            name: 'about',
            component: () => import('../agripure/farmer/Home_specialist1.vue')
        },
        {
            path: '/farmer/specialist',
            name: 'specialist',
            component: () => import('../agripure/farmer/farmer_specialist.vue')
        },
        {
            path: '/farmer/devices',
            name: 'devices',
            component: () => import('../agripure/farmer/farmer_devices.vue')
        },
        {
            path: '/farmer/notifications',
            name: 'notifications',
            component: () => import('../agripure/farmer/farmer_notifications.vue')
        },
        {
            path: '/farmer/projects',
            name: 'project',
            component: () => import('../agripure/farmer/farmer_projects.vue')
        },
        {
            path: '/farmer/profile',
            name: 'farmerProfile',
            component: () => import('../agripure/farmer/farmer_profile.vue')
        },
        {
            path: '/specialist/profile',
            name: 'specialistProfile',
            component: () => import('../agripure/specialist/specialist_profile.vue')
        },
        {
            path: '/farmer/chat/:id',
            name: 'chat',
            component: () => import('../agripure/farmer/farmer_chatMessages.vue'),
            props: true,
        },
        {
            path: '/specialist/chat/:id',
            name: 'specialist_chat',
            component: () => import('../agripure/specialist/specialist_ChatMessages.vue'),
            props: true,
        },
        {
            path: '/farmer/chat',
            name: 'farmerChat',
            component: () => import('../agripure/farmer/farmer_chat.vue')
        },
        {
            path: '/farmer/projects',
            name: 'farmerProject',
            component: () => import('../agripure/farmer/farmer_projects.vue')
        },
        {
            path: '/specialist/farmers',
            name: 'specialistFarmers',
            component: () => import('../agripure/specialist/specialist_farmers.vue')
        },
        {
            path: '/specialist/chat',
            name: 'specialistChat',
            component: () => import('../agripure/specialist/specialist_chat.vue')
        },
        {
            path: '/specialist/projects',
            name: 'specialistProjects',
            component: () => import('../agripure/specialist/specialist_projects.vue')
        },
        {
            path: '/specialist/notifications',
            name: 'specialistNotifications',
            component: () => import('../agripure/specialist/specialist_notifications.vue')
        },
    ]
})
export default router