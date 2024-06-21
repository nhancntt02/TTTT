<template>
    <Header></Header>
    <div id="pageInfo">
        <div class="row">
            <div class="col-12 col-sm-6 border-end">
                <div class="border">
                    <img :src="product.image" alt="anh" style="width: 80%;">
                </div>
                <div>
                    <p class="fs-3 text-center">Mô tả điện thoại</p>
                    <textarea name="" style="width: 100%;" rows="5">{{ product.description }}</textarea>
                </div>
            </div>
            <div class="col-sm-6">
                <h1 class="fs-2 fw-bold text-center mt-5 mb-3">Thông tin điện thoại</h1>
                <table class="table border table-bordered fs-5">
                    <tr class="table-info">
                        <th class="border-end px-1">Tên:</th>
                        <td class="px-1">{{ product.name }}</td>
                    </tr>
                    <tr>
                        <th class="border-end px-1">Màn hình:</th>
                        <td class="px-1">{{ product.properties.screen }}</td>
                    </tr>
                    <tr>
                        <th class="border-end px-1">Camera:</th>
                        <td class="px-1">{{ product.properties.camera }}</td>
                    </tr>
                    <tr>
                        <th class="border-end px-1">Chip:</th>
                        <td class="px-1">{{ product.properties.cpu }}</td>
                    </tr>
                    <tr>
                        <th class="border-end px-1">Ram:</th>
                        <td class="px-1">{{ product.properties.ram }} GB</td>
                    </tr>
                    <tr>
                        <th class="border-end px-1">Rom:</th>
                        <td class="px-1">{{ product.properties.rom }} GB</td>
                    </tr>
                    <tr>
                        <th class="border-end px-1">Pin:</th>
                        <td class="px-1">{{ product.properties.pin }}</td>
                    </tr>
                </table>
                <div>
                    <button @click="buyNow(product)" class="btn btn-outline-success">Mua ngay</button>
                    <button @click="addCart(product)" class="btn btn-outline-warning mx-2">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    </div>

</template>
<style>
#pageInfo {
    width: 1200px;
    margin: 0 auto;
}
</style>
<script>
import Header from "@/components/AppHeader.vue";
import ProductService from "@/services/product.service";
import CustomerService from "@/services/customer.service";
export default {
    components: {
        Header,
    },
    props: {
        productId: { type: String, default: "" }
    },
    data() {
        return {
            product: {
                properties: {
                    screen: null,
                    cpu: null,
                    ram: null,
                    rom: null,
                    pin: null
                },
                username: "",
                password: "",
            }
        }
    },
    methods: {
        async retrieveProducts() {
            try {

                this.product = await ProductService.get(this.productId);
            } catch (error) {
                console.log(error)
            }
        },
        async addCart(product) {
            try {
                const user = await CustomerService.getUserCart(sessionStorage.getItem('user'));
                if (user) {
                    product.username = user[0].username;
                    product.password = user[0].password;
                }
                product.quantity = 1;

                const rs = await CustomerService.createCart(product);
                alert('Thêm sản phẩm vào giỏ hàng thành công');
            } catch (error) {
                console.log(error)
            }
        },
        async buyNow(product) {
            try {
                if (!sessionStorage.getItem('user') || sessionStorage.getItem('user') == 'guest') {
                    confirm("Ban chua dang nhap can phai dang nhap");
                } else {
                    const user = await CustomerService.getUserCart(sessionStorage.getItem('user'));
                    if (user) {
                        product.username = user[0].username;
                        product.password = user[0].password;
                    }
                    product.quantity = 1;

                    const rs = await CustomerService.createCart(product);
                    this.$router.push({ name: 'orderconfirm', params: { total: product.price } });
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.retrieveProducts();
    }
}
</script>