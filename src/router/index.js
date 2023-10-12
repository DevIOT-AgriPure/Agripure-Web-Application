import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/farmer/cropInventory',
        },
        {
            path: '/specialist',
            name: 'about',
            component: () => import('../agripure/Home_specialist.vue')
        },
        {
            path: '/farmer/cropDetail',
            name: 'cropdetail',
            component: () => import('../agripure/farmer/crop_details.vue')
        }
        ,
        {
            path: '/farmer/cropInventory',
            name: 'cropInventory',
            component: () => import('../agripure/farmer/crop_inventory.vue')
        },
        {
            path:'/farmer/createCrop',
            name:'createcrop',
            component:()=>import('../agripure/farmer/create_crop.vue')
        },
        {
            path: '/specialist',
            name: 'about',
            component: () => import('../agripure/farmer/Home_specialist1.vue')
        },
        {
            path: '/farmer/specialist',
            name: 'about',
            component: () => import('../agripure/farmer/farmer_specialist.vue')
        },
        {
            path: '/farmer/projects',
            name: 'project',
            component: () => import('../agripure/farmer/farmer_projects.vue')
        },
        {
            path: '/info/:id',
            name: 'info',
            component: () => import('../agripure/farmer/Home_specialist2.vue'),
            props: true,
        },
        {
            path: '/farmer/chat/:id',
            name: 'chat',
            component: () => import('../agripure/farmer/farmer_chatMessages.vue'),
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
    ]
})
export default router