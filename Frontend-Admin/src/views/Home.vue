<template>
    <div id="wrapperH" class="row">
        <div class="col-6 border-end border-bottom border-dark border-3 fs-3 d-flex flex-column justify-content-center"
            style="height:400px ;">
            <div class="my-3">
                Số lượng đơn hàng trong tháng: {{ datas.length }}
            </div>
            <div>
                Doanh thu trong tháng: {{ total }}
            </div>
        </div>
        <div class="col-6 border-end border-bottom border-dark border-3" style="height:400px;">
            <img src="https://i.imgur.com/TvtwHeZ.jpeg" alt="" style="height: 100%;">
        </div>
        <div class="col-12 fs-3">
            Số sản phẩm hiện có trong cửa hàng: {{ products.length }}
            <div class="fs-5">
                Số sản phẩm của Iphone: {{ quantity.ip }}<br>
                Số sản phẩm của Samsung: {{ quantity.ss }}<br>
                Số sản phẩm của Oppo: {{ quantity.op }} <br>
                Số sản phẩm của Xiaomi: {{ quantity.vv }}
            </div>

        </div>
    </div>
</template>
<style>
#wrapperH {
    background: radial-gradient(rgb(150, 211, 255), white);
    background-size: cover;
    width: 100%;
    height: 100%;
    margin: 0;
}
</style>
<script>

import orderService from '@/services/order.service';
import productService from '@/services/product.service';
export default {
    data() {
        return {
            orders: [],
            datas: [],
            total: 0,
            products: [],
            quantity: {
                ip: 0,
                ss: 0,
                op: 0,
                vv: 0,
            },

        }
    },
    methods: {
        async getAllProduct() {
            try {
                this.products = await productService.getAll();
                this.products.forEach(product => {
                    switch (product.publisher) {
                        case "Iphone":
                            this.quantity.ip++;
                            break;
                        case "Samsung":
                            this.quantity.ss++;
                            break;
                        case "Oppo":
                            this.quantity.op++;
                            break;
                        case "Xiaomi":
                            this.quantity.vv++;
                            break;
                        default:
                            break;
                    }
                })
            } catch (error) {
                console.log(error);
            }
        },
        async getAllOrder() {
            try {
                this.orders = await orderService.getAllOrder();
                this.totalMonth();
            } catch (error) {
                console.log(error);
            }
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
        totalMonth() {
            this.total = 0;
            this.datas = [];
            for (let index = 0; index < this.orders.length; index++) {
                const date = { date: new Date().toISOString().substr(0, 7) };
                const m = this.getM(date.date);
                const y = this.getY(date.date);
                const m1 = this.getM(this.orders[index].date);
                const y1 = this.getY(this.orders[index].date);
                if (this.orders[index].status == "Đã nhận hàng")
                    if ((m1 == m) && (y1 == y)) {
                        this.total += Number(this.orders[index].price) * this.orders[index].quantity;
                        const data = {
                            orderId: this.orders[index].orderId,


                        }
                        const found = this.datas.some(item =>
                            item.orderId == data.orderId
                        );
                        if (!found) {
                            this.datas.push(data);
                        }
                    }
            }
            this.total = this.changeMoney(this.total);
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
        this.getAllOrder();
        this.getAllProduct();
    }
}
</script>