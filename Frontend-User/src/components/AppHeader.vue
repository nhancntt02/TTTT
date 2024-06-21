<template>
    <div class="col-12 bg-info" style="height: 100px;" >
            <div class="d-flex justify-content-between" id="div-header">
                <div @click="homePage" style="height: 50px; margin: auto 0;" class="fs-2 mx-4"><i class="fa-solid fa-house"></i> SHOP</div>
                <div v-if="checkLogin()" style="height: 50px; margin: auto 0;">
                    <button @click="goCart" class="btn btn-secondary mx-2">Giỏ hàng</button>
                    <button @click="goLogin" class="btn btn-warning mx-2">Đăng nhập</button>
                    <button @click="goRegister" class="btn btn-warning mx-2">Đăng ký</button>
                    
                </div>
                <div v-else class="d-flex" style="height: 35px; margin: auto 0;">
                    <button @click="goOrder" class="btn btn-secondary mx-2">Đơn hàng</button>
                    <button @click="goCart" class="btn btn-secondary mx-2">Giỏ hàng</button>
                    <p @click="goUserInfo" class="fs-5 mx-2"><i class="fa-solid fa-user"></i>{{ username }}</p>
                    <button @click="logout" class="btn btn-secondary mx-2">Đăng xuất</button>
                </div>
            </div>
    </div>
</template> 
<style>
#div-header {
    height: 100px;
}
</style>
<script>
    export default {
        data() {
            return {
                username: "",
            }
        },
        methods:{
            homePage(){
                if(this.$router.currentRoute.value.name == "home") {
                    location.reload();
                }
                else {
                   this.$router.push({name:'home'}); 
                }
 
            },
            checkLogin() {
                if(sessionStorage.getItem('user') == null || sessionStorage.getItem('user') == 'guest') {
                    return true;
                } else {
                    return false;
                }
            },
            goLogin(){
                this.$router.push({name:'login'});
            },
            goRegister() {
                this.$router.push({name:'register'});
            },
            goCart() {
                this.$router.push({name:'cart'});
            },
            goOrder() {
                this.$router.push({name: 'order'});
            },
            goUserInfo() {
                this.$router.push({name: 'customerinfo'})
            },
            logout() {
                sessionStorage.removeItem('user');
                this.homePage();
            }

        },
        mounted() {
            if(sessionStorage.getItem('user')) {
                this.username = sessionStorage.getItem('user');
            }
        }
    }
</script>