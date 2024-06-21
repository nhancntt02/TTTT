<template>
    <Header></Header>
    <div id="wrapper">
        <p class="border-bottom border-3 fs-3 fw-bold text-info text-center py-2">Thông tin khách hàng</p>
        <div>
            <table class="table table-bordered fs-5" style="width: 50%; margin: 0 auto;">
                <tr>
                    <th>Tên: </th>
                    <td>{{ customer.realname }}</td>
                </tr>
                <tr>
                    <th>Địa chỉ:</th>
                    <td>
                        {{ customer.address }}
                    </td>
                </tr>
                <tr>
                    <th>Số điện thoại:</th>
                    <td>
                        0{{ customer.numberPhone }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<style>
#wrapper {
    width: 1000px;
    margin: 0 auto;
    
}
</style>
<script>
import orderService from '@/services/order.service';
import customerService from '@/services/customer.service';
import Header from '@/components/AppHeader.vue';
export default {
    components: {
        Header,
    },
    data() {
        return {
            customer: {
                realname: "",
                address: "",
                numberPhone: "",
            },
        }
    },
    methods: {
        async getUser() {
            try {
                const username = sessionStorage.getItem('user');
                const rs = await orderService.getUserOrder(username);
                this.customer = rs[0];
                console.log(this.customer);
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
         this.getUser();
    }
}
</script>