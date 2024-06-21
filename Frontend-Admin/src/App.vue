<script>
 import AppHeader from "@/components/AppHeader.vue";
 export default {
    components: {
        AppHeader,
    },
};
 </script>

<template>
    <div id="app" class="d-flex">
        <AppHeader />
        <div class="container p-0">
            <router-view />
        </div>
    </div>
</template>
