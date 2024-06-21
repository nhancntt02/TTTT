import { createWebHistory, createRouter } from "vue-router";
import Home from "@/view/Home.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/view/Login.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/view/Register.vue"),
    },
    {
        path: "/productinfo/:productId",
        name: "productinfo",
        component: () => import("@/view/ProductInfo.vue"),
        props: true,
    },
    {
        path: "/custome/info",
        name: "customerinfo",
        component: () => import("@/view/Customer.vue"),
    },
    {
        path: "/cart",
        name: "cart",
        component: () => import("@/view/Cart.vue"),
    },
    // {
    //     path: "/notifition",
    //     name: "notify",
    //     component: () => import("@/view/Notify.vue")
    // },
    {
        path: "/order/confirm/:total",
        name: "orderconfirm",
        component: () => import("@/view/OrderConfirm.vue"),
        props: true
    },
    {
        path: "/order",
        name: "order",
        component: () => import("@/view/Order.vue"),
    },
    // {
    //     path: "/about",
    //     name: "about",
    //     component: () => import("@/view/About.vue"),
    // },
    // {
    //     path: "/support",
    //     name: "support",
    //     component: () => import("@/view/Support.vue"),
    // },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;