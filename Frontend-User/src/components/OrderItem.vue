<template>
    <div v-for="order in orders" class="border-bottom">
        <img :src="order.image" alt="" style="width: 50px;">
        Tên: {{ order.name }} - Số lượng: {{ order.quantity }} - Giá: {{ order.price }}
    </div>
</template>
<script>
import orderService from "@/services/order.service";
export default {
    props: {
        orderId: {type: String, require: true}
    },
    data() {
        return {
            orders: []
        }
    },
    methods: {
        async getOrder() {
            try {
                this.orders = await orderService.getOrder(this.orderId);
                console.log(this.orders);
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