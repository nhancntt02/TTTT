<template>
    <div class="row m-1">
        <div class="col-12 border-bottom border-dark my-1" style="min-height: 170px;">
            <h1 class="text-center mt-5">Danh sách đơn hàng</h1>
        </div>
        <div class="p-2">
            <button @click="getAllOrder()" class="btn btn-outline-info mx-2">
                Tất cả các đơn hàng
            </button>
            <button @click="getSuccessOrder()" class="btn btn-outline-info mx-2">
                Đơn hàng đã thanh toán
            </button>
            <button @click="getOrderConfirm()" class="btn btn-outline-info mx-2">
                Đơn hàng cần xác nhận
            </button>
        </div>
        <div style="width: 80%; margin: 0 auto">
            <ul class="list-group ">
                <li v-for="(item, index) in datas" :key="item._id" class="list-group-item">
                    <div class="d-flex justify-content-between">
                        <div :class="{ 'text-success': item.status == 'Đã nhận hàng' }">
                            Mã đơn hàng: {{ item.orderId }} - Ngày đặt: {{ item.date }} - Tổng tiền: {{ item.total }} -
                            {{ item.status }}
                        </div>
                        <div v-if="isOrderDetailVisible(item.orderId)">
                            <button @click="confirmOrder(item.orderId)" class="btn btn-success mx-1"
                                v-if="item.status == 'Chờ xác nhận'">Xác nhận đơn hàng</button>
                            <button @click="confirmOrder(item.orderId)" class="btn btn-success mx-1"
                                v-else-if="item.status == 'Đã xác nhận'">Đưa đến đơn vị vận chuyển</button>

                            <i class="fa-solid fa-chevron-up mt-1" @click="infoOrder(item.orderId, index)"></i>
                        </div>
                        <div v-else>
                            <button @click="confirmOrder(item.orderId)" class="btn btn-success mx-1"
                                v-if="item.status == 'Chờ xác nhận'">Xác nhận đơn hàng</button>
                            <button @click="confirmOrder(item.orderId)" class="btn btn-success mx-1"
                                v-else-if="item.status == 'Đã xác nhận'">Đưa đến đơn vị vận chuyển</button>
                            <i class="fa-solid fa-chevron-down mt-1" @click="infoOrder(item.orderId, undex)"></i>
                        </div>


                    </div>
                    <div v-if="isOrderDetailVisible(item.orderId)" class="col-6">
                        <OrderCard :orderId="item.orderId"></OrderCard>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style></style>
<script>
import orderService from '@/services/order.service';
import OrderCard from '@/components/OrderCard.vue';
export default {
    components: {
        OrderCard,
    },
    data() {
        return {
            orders: [],
            datas: [],
            check2: {},
        }
    },
    methods: {
        async getAllOrder() {
            try {
                this.orders = await orderService.getAllOrder();

                this.orders.forEach((order) => {
                    const data = {
                        orderId: order.orderId,
                        date: order.date,
                        total: order.total,
                        status: order.status
                    };
                    const found = this.datas.some(item =>
                        item.orderId == data.orderId
                        && item.date == data.date
                        && item.total == data.total
                        && item.status == data.status);
                    if (!found) {
                        this.datas.push(data);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        getSuccessOrder() {
            this.datas = [];
            this.orders.forEach((order) => {
                if (order.status == 'Đã nhận hàng') {
                    const data = {
                        orderId: order.orderId,
                        date: order.date,
                        total: order.total,
                        status: order.status
                    };
                    const found = this.datas.some(item =>
                        item.orderId == data.orderId
                        && item.date == data.date
                        && item.total == data.total
                        && item.status == data.status);
                    if (!found) {

                        this.datas.push(data);
                    }
                }

            });
        },
        getOrderConfirm() {
            this.datas = [];
            this.orders.forEach((order) => {
                if (order.status != 'Đã nhận hàng') {
                    const data = {
                        orderId: order.orderId,
                        date: order.date,
                        total: order.total,
                        status: order.status
                    };
                    const found = this.datas.some(item =>
                        item.orderId == data.orderId
                        && item.date == data.date
                        && item.total == data.total
                        && item.status == data.status);
                    if (!found) {
                        this.datas.push(data);
                    }
                }

            });
        },
        infoOrder(id, index) {
            this.activeIndex = index;
            this.check2[id] = !this.check2[id];
            console.log(this.check2);
            this.check = id;
        },
        isOrderDetailVisible(orderId) {
            return this.check2[orderId];
        },
        async confirmOrder(orderId) {
            if (confirm("Bạn muốn xác nhận đơn hàng: " + orderId)) {
                try {
                    const result = await orderService.update(orderId);
                    location.reload();
                    console.log(result);
                } catch (error) {
                    console.log(error);
                }
            }

        },

    },
    mounted() {
        this.getAllOrder();
    }
}
</script>