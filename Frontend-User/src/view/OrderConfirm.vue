<template>
    <div class="wrapper">
        <p class="fs-3 text-info text-center fw-bold pt-2">Xác nhận thông tin đơn hàng</p>
        <hr class="border border-primary border-2 opacity-75" style="width: 80%; margin: 0 auto;">
        <i @click="goHomePage" class="fa-solid fa-house fs-3" style="margin-left: 90px; margin-top: 10px;"></i>
        <div class="" style="margin-top: 60px;">
            <form @submit.prevent="confirmOrder" class="form-group border p-2" style="width: 50%; margin: 0 auto; ">
                <div class="row justify-content-md-center pt-2">
                    <label for="name" class="form-label col-4">
                        Họ và tên:
                    </label>
                    <div class="col-5">
                        <input class="form-control" id="name" type="text" placeholder="Nhập họ và tên "
                            v-model="info.realname">
                    </div>
                </div>
                <div class="row justify-content-md-center pt-2">
                    <label for="address" class="form-label col-4">
                        Đia chỉ:
                    </label>
                    <div class="col-5">
                        <input class="form-control" id="address" type="text" placeholder="Nhập địa chỉ giao hàng "
                            v-model="info.address">
                    </div>
                </div>
                <div class="row justify-content-md-center pt-2">

                    <label for="phone" class="form-label col-4">
                        Số điện thoại:
                    </label>
                    <div class="col-5">
                        <input class="form-control" id="phone" type="number" placeholder="Nhập số điện thoại "
                            v-model="info.numberPhone">
                    </div>
                </div>
                <div class="row justify-content-md-center pt-2">
                    <label for="payment" class="form-label col-4">
                        Phương thức thanh toán:
                    </label>
                    <div class="col-5">
                        <select class="form-select" id="payment" aria-label="Default select example"
                            v-model="info.payment" placeholder="">
                            <option value="1">Thanh toán khi nhận hàng</option>
                            <option value="2">VNPay</option>
                        </select>
                    </div>
                </div>
                <div class="pt-3 row">
                    <button  class="btn btn-outline-secondary offset-2 col-2">Xác nhận</button>
                </div>

            </form>
        </div>
    </div>
</template>
<style>
.wrapper {
    margin: 0 auto;
    margin-top: 50px;
    width: 1200px;
    height: 500px;
    border: 1px solid black;
}
</style>
<script>
import customerService from '@/services/customer.service';
import orderService from '@/services/order.service';
export default {
    props: {
        total: { type: Number, require: true }
    },
    data() {
        return {
            info: {
                realname: "",
                address: "",
                numberPhone: "",
                payment: ""
            },
            user: "",
            carts: [],
            orderId: "",

        }
    },
    methods: {
        async confirmOrder() {

            this.carts = await customerService.getUserCart(this.user);
            this.carts = this.carts.filter((cart) => cart.productId != null);
            this.carts.forEach(async (item) => {
                const order = {
                    orderId: this.orderId,
                    username: item.username,
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    total: this.total,
                    date: new Date().toISOString().substr(0, 10),
                    realname: this.info.realname,
                    address: this.info.address,
                    numberPhone: this.info.numberPhone.toString(),
                    payment: this.info.payment
                };
                const rs = await orderService.create(order);
                if(rs){
                   await customerService.deleteCart(item.username, item.productId);
                }  
            })
            this.$router.push({name: 'home'});
        },
        async getOrderId() {
            for(let i = 1; i < 5; i++) {
                this.orderId = this.user + i;
                console.log(this.orderId);
                const rs = await orderService.getOrder(this.orderId);
                
                console.log(rs);
                if(rs.length == 0) {
                    break;
                }
            }
            
        },
        goHomePage() {
            this.$router.push({name: 'home'})
        }
    },
    mounted() {
        this.user = sessionStorage.getItem('user');
        this.getOrderId();
    }

}
</script>