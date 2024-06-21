<template>
    <div class="row m-1">
        <div class="col-12 border-bottom border-dark my-1" style="min-height: 150px;">
            <h1 class="text-center mt-4 fw-bold">Doanh thu</h1>
        </div>
        <div class="my-2">
            <button class="btn btn-outline-info mx-1" @click="totalAll">Tổng doanh thu</button>
            <button class="btn btn-outline-info mx-1" @click="totalType(1)">Doanh thu ngày</button>
            <button class="btn btn-outline-info mx-1" @click="totalType(2)">Doanh thu tháng</button>
            <button class="btn btn-outline-info mx-1" @click="totalType(3)">Doanh thu năm</button>
            <form v-if="type == 1" class="mt-2">
                <label class="form-label" for="day">Nhập ngày:</label>
                <input class="form-control w-25" type="date" v-model="date" id="day">
                <button class="btn btn-sm btn-primary mt-2" @click.prevent="totalDate()">Tính toán</button>
            </form>
            <form v-if="type == 2" class="mt-2 w-25">
                <div class="d-flex">
                    <input type="number" inputmode="numeric" name="month" class="form-control me-2" id="month" min="1"
                        max="12" v-model="month" placeholder="Tháng" required />
                    <input type="number" inputmode="numeric" name="year" class="form-control" id="year" min="1000"
                        max="3000" v-model="year" placeholder="Năm" required />
                </div>
                <button class="btn btn-sm btn-primary mt-2" @click.prevent="totalMonth()">Tính toán</button>
            </form>
            <form v-if="type == 3" class="mt-2">
                <input type="number" inputmode="numeric" name="year" class="form-control" id="year" min="1000"
                    max="3000" v-model="year" placeholder="Năm" required style="width: 200px;" />
                <button class="btn btn-sm btn-primary mt-2" @click.prevent="totalYear()">Tính toán</button>
            </form>
        </div>
        <hr>
        <div class="col-6">
            <ul class="list-group ">
                <li v-for="(item, index) in datas" :key="item._id" :class="{ 'active': index === activeIndex }"
                    class="list-group-item">
                    <div>
                        Mã đơn hàng: {{ item.orderId }} - Ngày đặt: {{ item.date }} - Tổng tiền: {{ item.total }}
                        <i v-if="isOrderDetailVisible(item.orderId)" class="fa-solid fa-chevron-up mt-1"
                            @click="infoOrder(item.orderId, index)"></i>
                        <i v-else class="fa-solid fa-chevron-down mt-1" @click="infoOrder(item.orderId, undex)"></i>
                    </div>
                </li>
            </ul>

        </div>
        <div v-if="isOrderDetailVisible(getCheck)" class="col-6">
            <OrderCard :orderId="getCheck"></OrderCard>
        </div>
        <div>
            <p class="col-12 h4 mt-3">Tổng doanh thu: {{ total }}</p>
        </div>
    </div>
</template>
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
            activeIndex: -1,
            datas: [],
            total: 0,
            type: 0,
            date: "",
            month: "",
            year: "",
            check: "",
            check2: {},
        }
    },
    computed: {
        getCheck() {
            return this.check;
        },
    },
    methods: {
        async getOrder() {
            try {
                this.orders = await orderService.getAllOrder();
                console.log(this.orders);
                this.totalAll();
            } catch (error) {
                console.log(error);
            }

        },
        totalType(type) {
            this.type = type;
        },
        getM(data) {
            const d = new Date(data);
            const month = "" + (d.getMonth() + 1);
            return month;
        },
        getY(data) {
            const d = new Date(data);
            const year = d.getFullYear();
            return year;
        },
        totalDate() {
            this.total = 0;
            this.datas = [];
            for (let index = 0; index < this.orders.length; index++) {
                if (this.orders[index].status == "Đã nhận hàng")
                    if (this.date === this.orders[index].date) {
                        this.total += Number(this.orders[index].price) * this.orders[index].quantity;
                        const data = {
                            orderId: this.orders[index].orderId,
                            date: this.orders[index].date,
                            total: this.orders[index].total
                        }
                        const found = this.datas.some(item =>
                            item.orderId == data.orderId
                            && item.date == data.date
                            && item.total == data.total);
                        if (!found) {
                            this.datas.push(data);
                        }


                    }

            }
            this.total = this.changeMoney(this.total);
        },
        totalMonth() {
            this.total = 0;
            this.datas = [];
            for (let index = 0; index < this.orders.length; index++) {
                const m = this.getM(this.orders[index].date);
                const y = this.getY(this.orders[index].date);
                if (this.orders[index].status == "Đã nhận hàng")
                    if ((this.month == m) && (this.year == y)) {
                        this.total += Number(this.orders[index].price) * this.orders[index].quantity;
                        const data = {
                            orderId: this.orders[index].orderId,
                            date: this.orders[index].date,
                            total: this.orders[index].total
                        }
                        const found = this.datas.some(item =>
                            item.orderId == data.orderId
                            && item.date == data.date
                            && item.total == data.total);
                        if (!found) {
                            this.datas.push(data);
                        }
                    }
            }
            this.total = this.changeMoney(this.total);
        },
        totalYear() {
            this.total = 0;
            this.datas = [];
            for (let index = 0; index < this.orders.length; index++) {
                const y = this.getY(this.orders[index].date);
                if (this.orders[index].status == "Đã nhận hàng")
                    if ((this.year == y)) {
                        this.total += Number(this.orders[index].price) * this.orders[index].quantity;
                        const data = {
                            orderId: this.orders[index].orderId,
                            date: this.orders[index].date,
                            total: this.orders[index].total
                        }
                        const found = this.datas.some(item =>
                            item.orderId == data.orderId
                            && item.date == data.date
                            && item.total == data.total);
                        if (!found) {
                            this.datas.push(data);
                        }
                    }
            }
            this.total = this.changeMoney(this.total);
        },
        totalAll() {
            this.total = 0;
            this.type = 0;
            this.datas = []

            this.orders.forEach((order) => {
                if (order.status == "Đã nhận hàng") {
                    const data = {
                        orderId: order.orderId,
                        date: order.date,
                        total: order.total
                    };
                    const found = this.datas.some(item =>
                        item.orderId == data.orderId
                        && item.date == data.date
                        && item.total == data.total);
                    if (!found) {
                        this.datas.push(data);
                    }
                }

            });

            this.orders.forEach((order) => {
                if (order.status == "Đã nhận hàng") {
                    this.total += order.quantity * Number(order.price);
                }

            });
            this.total = this.changeMoney(this.total);
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
        changeMoney(money) {
            const VND = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
            return VND.format(money);
        }
    },
    mounted() {
        this.getOrder();
    }
}
</script>