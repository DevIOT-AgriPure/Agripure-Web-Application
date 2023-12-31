import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/sign-in',
            redirect: '/',
        },
        {
            path: '/',
            name: 'signIn',
            component: () => import('../public/pages/sign-in.component.vue')
        },
        {
            path: '/sign-up',
            name: 'signUp',
            component: () => import('../public/pages/sign-up.component.vue')
        },
        {
            path: '/farmer/crops',
            name: 'cropInventory',
            component: () => import('../agripure/pages/crop/farmer-crop-inventory.component.vue')
        },
        {
            path: '/farmer/specialist',
            name: 'specialist',
            component: () => import('../agripure/pages/advisory/farmer-specialist-contacts.component.vue')
        },
        {
            path: '/farmer/devices',
            name: 'devices',
            component: () => import('../agripure/pages/iotManagement/farmer-devices.component.vue')
        },
        {
            path: '/farmer/notifications',
            name: 'notifications',
            component: () => import('../agripure/pages/customComunicationManagement/farmer-notifications.component.vue')
        },
        {
            path: '/farmer/projects',
            name: 'project',
            component: () => import('../agripure/pages/advisory/farmer-projects.component.vue')
        },
        {
            path: '/farmer/profile',
            name: 'farmerProfile',
            component: () => import('../agripure/pages/profile/farmer-profile.component.vue')
        },
        {
            path: '/specialist/profile',
            name: 'specialistProfile',
            component: () => import('../agripure/pages/profile/specialist-profile.component.vue')
        },
        {
            path: '/farmer/chats/:id',
            name: 'chat',
            component: () => import('../agripure/pages/customComunicationManagement/farmer-chat-messages.component.vue'),
            props: true,
        },
        {
            path: '/specialist/chats/:id',
            name: 'specialist_chat',
            component: () => import('../agripure/pages/customComunicationManagement/specialist-chat-messages.component.vue'),
            props: true,
        },
        {
            path: '/farmer/chats',
            name: 'farmerChat',
            component: () => import('../agripure/pages/customComunicationManagement/farmer-chat.component.vue')
        },
        {
            path: '/farmer/projects',
            name: 'farmerProject',
            component: () => import('../agripure/pages/advisory/farmer-projects.component.vue')
        },
        {
            path: '/specialist/farmers',
            name: 'specialistFarmers',
            component: () => import('../agripure/pages/advisory/specialist_farmers-contacts.component.vue')
        },
        {
            path: '/specialist/chats',
            name: 'specialistChat',
            component: () => import('../agripure/pages/customComunicationManagement/specialist-chat.component.vue')
        },
        {
            path: '/specialist/projects',
            name: 'specialistProjects',
            component: () => import('../agripure/pages/advisory/specialist-projects.component.vue')
        },
        {
            path: '/specialist/notifications',
            name: 'specialistNotifications',
            component: () => import('../agripure/pages/customComunicationManagement/specialist-notifications.component.vue')
        },
        {
            path: '/specialist/notifications',
            name: 'specialistNotifications',
            component: () => import('../agripure/pages/customComunicationManagement/specialist-notifications.component.vue')
        },
        {
            path: '/successful-pay',
            name: 'successfulPay',
            component: () => import('../public/pages/successful-pay.component.vue')
        },
        {
            path: '/unsuccessful-pay',
            name: 'unsuccessfulPay',
            component: () => import('../public/pages/unsuccessful-pay.component.vue')
        },
    ]
})
export default router