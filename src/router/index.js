import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: () => import('../agripure/Home_farmer.vue')

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
        }
    ]
})
export default router