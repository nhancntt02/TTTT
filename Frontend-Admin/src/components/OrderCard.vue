<template>
    <div class="">
        <div v-if="orders.length > 0">
            <div v-for="order in orders" class="py-1">
                <img :src="order.image" alt="" style="width: 50px;">
                Tên: {{ order.name }} - Giá: {{ order.price }} - Số lượng: {{ order.quantity }}
            </div>
        </div>
    </div>
</template>

<script>
import orderService from '@/services/order.service';

export default {
    props: {
        orderId: {type: String, require: true}
    },
    data() {
        return {
            orders: [],
        }
    },
    methods: {
        async getData() {
            try {
                this.orders = await orderService.getOrder(this.orderId);
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getData();
    }
}
</script>