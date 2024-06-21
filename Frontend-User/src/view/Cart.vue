<template>
    <Header></Header>
    <div>
        <div class="wapper">
            <p class="fs-2 fw-bold text-center">Giỏ hàng của bạn</p>
            <hr class="border border-primary border-3 opacity-75">
            <div>
                <div v-if="carts.length == 0" class="container text-center fs-3 pt-4 mt-auto">
                    <p>Giỏ hàng của bạn không có gì cả!</p>
                    <p>Mua hàng ngay nào!</p>
                    <button class="btn btn-sm btn-outline-primary"><router-link class="nav-link fs-3"
                            :to="{ name: 'home' }">Trang chủ</router-link></button>
                </div>
                <div v-else>
                    <table id="myTable" class="table table-hover table-responsive w-75 mx-auto">
                        <thead>
                            <tr>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng cộng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <CartItem v-for="cart in carts" :key="cart.username" :cart="cart" :user="user" />
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4">Tổng cộng</td>
                                <td class="fw-bold">{{ getTotal }} VNĐ</td>
                                <div>
                                    <td v-if="checkLogin()">
                                        <div v-if="!soldOut">
                                                <button @click="goOrderComfirm" class="btn btn-sm btn-primary">Mua hàng</button>
                                        </div>
                                        <div v-else>
                                            <button disabled class="btn btn-sm btn-secondary">Hết hàng</button>
                                        </div>
                                    </td>
                                </div>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.wapper {
    padding: 5px 0;
    width: 1200px;
    height: 700px;
    border: 1px solid;
    margin: 0 auto;
}
</style>
<script>
import CartItem from "@/components/CartItem.vue";
import Header from "@/components/AppHeader.vue";
import CustomerService from "@/services/customer.service";
export default {
    components: {
        Header,
        CartItem,
    },
    data() {
        return {
            carts: [],
            total: 0,
            user: "",
        }
    },
    computed: {
        getTotal() {
            return this.total.toLocaleString('vi-VN');
        }
    },
    methods: {
        async getUserCart() {
            try {
                this.user = sessionStorage.getItem('user');
                this.carts = await CustomerService.getUserCart(this.user);
                this.carts = this.carts.filter((cart) => cart.productId != null );
                this.carts.forEach(cart => {
                    let priceP = cart.quantity * cart.price;
                    this.total += priceP;
                });
            } catch (error) {
                console.log(error);
            }
        },
        goOrderComfirm() {
            this.$router.push({ name: 'orderconfirm', params: { total: this.total } })
        },
        checkLogin() {
            if(sessionStorage.getItem('user') !== 'guest')
                return true;
            return false;
        }
    },
    mounted() {
        this.getUserCart();
    }

}
</script>