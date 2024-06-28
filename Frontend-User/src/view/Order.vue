<template>
    <Header></Header>
    <div>
        <p class="fs-3 fw-bold text-info text-center">Đơn hàng của bạn</p>
        <hr>
        <div class="wrapper">
            <table class="table table-bordered">
                <thead>
                    <tr class="row">
                        <th class="col-2">Mã đơn hàng</th>
                        <th class="col-5">Sản Phẩm</th>
                        <th class="col-3">Trạng thái</th>
                        <th class="col-2">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="orderItem in orderIds" class="row">
                        <td class="col-2 d-flex align-items-center">
                            {{ orderItem }}
                        </td>
                        <td class="col-5">
                            <OrderItem :orderId="orderItem"/>
                        </td>
                        <td class="col-3 d-flex align-items-center">
                            {{ status[orderItem] }}
                        </td>
                        <td class="col-2 d-flex align-items-center justify-content-center">
                            <button v-if="status[orderItem] == 'Đang vận chuyển'" @click="giveProduct(orderItem)" class="btn btn-outline-success">
                                Đã nhận hàng
                            </button>
                            <button v-else disabled class="btn btn-outline-secondary">
                                Đã nhận hàng
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style>
.wrapper {
    width: 1200px;
    margin: 0 auto;
}
</style>
<script>
import Header from "@/components/AppHeader.vue";
import orderService from "@/services/order.service"
import OrderItem from "@/components/OrderItem.vue"
export default {
    components: {
        Header,
        OrderItem
    },
    data() {
        return {
            orders: [],
            orderIds: [],
            status: [],
        }
    },
    computed: {

    },
    methods: {
        async getOrder() {
            try {
                const username = sessionStorage.getItem('user');
                this.orders = await orderService.getUserOrder(username);
                console.log(this.orders);
            } catch (error) {
                console.log(error);
            }
            this.getOrderId();
        },
        getOrderId() {
            this.orders.forEach((order) => {
                if (!this.orderIds.includes(order.orderId)) {
                    this.orderIds.push(order.orderId);
                    this.getOnerOrder(order.orderId);
                }
            })
            console.log(this.orderIds);
        },
        async getOnerOrder(orderId) {
            try {
                const rs = await orderService.getOrder(orderId);
                this.status[orderId] = rs[0].status ;
                return true;
            } catch (error) {
                console.log(error);
            }
        },

        async giveProduct(orderId) {
            try {
                if(confirm('Bạn muốn xác nhận đã lấy được hàng?')){
                    await orderService.update(orderId);
                    location.reload();
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.getOrder();
    }
}
</script>