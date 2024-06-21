import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/product",
        name: "product",
        component: () => import("@/views/Product.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/edit-product/:id",
        name: "product-edit",
        component: () => import("@/views/ProductEdit.vue"),
        props: true
    },
    {
        path: "/add-book",
        name: "book-add",
        component: () => import("@/views/ProductAdd.vue"),
    },
    // {
    //     path: '/notify',
    //     name: 'notification',
    //     component: ()=> import('@/views/Notify.vue')
    // },
    {
        path:'/revenue',
        name: 'revenue',
        component: () => import('@/views/Revenue.vue'),
    },
    {
        path:'/order',
        name: 'order',
        component: () => import('@/views/Order.vue'),
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;