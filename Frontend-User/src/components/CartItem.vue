<template>
    <tr>
        <td>
            <img class="img-fluid p-2" :src="cart.image" alt="" style="height: 100px; width: 100px; margin: 0 auto;">
        </td>
        <td>
            {{ cart.name }}
        </td>
        <td>
            {{ getPrice }}
        </td>

        <td v-if="product.quantity > 0">
            <input @change="editCard" type="number" class="form-control" inputmode="numeric" v-model="cart.quantity" style="width: 50px;"
                min="1">
        </td>
        <td v-else class="text-danger">Đã hết hàng</td>
        <td>
            {{ getTotal }}
        </td>
        <td>
            <div >
                <button class="btn btn-sm btn-outline-danger me-2" @click="removeFromCart(cart.productId)">Xóa</button>
                
            </div>
        </td>
    </tr>
</template>
<style>
td {
    vertical-align: middle;
}
</style>
<script>
import ProductService from "@/services/product.service";
import CartService from "@/services/customer.service";
export default {
    props: {
        cart: { type: Object, required: true, },
    },
    data() {
        return {
            change: false,
            user: "",
            product: {},
        }
    },
    computed: {
        getTotal() {
            let total = this.cart.quantity * this.cart.price;
            return total.toLocaleString('vi-VN')
        },
        getPrice() {
            return this.cart.price.toLocaleString('vi-VN')
        }
    },
    methods: {
        async getProduct() {
            try {
                this.product = await ProductService.get(this.cart.productId);
            } catch (error) {
                console.log(error);
            }
        },
        async editCard() {
            try {
                await CartService.update(this.user, this.cart);
                location.reload();
            } catch (error) {
                alert("Cập nhật thất bại");
            }
            this.change = false;
        },
        async removeFromCart(id) {
            if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
                try {
                    const result = await CartService.delete(this.user, id);
                    location.reload();
                }
                catch (error) {
                    alert('Xóa không thành công');
                }
            }
        }
    },
    created() {
        this.getProduct();
        this.user = sessionStorage.getItem("user") ? sessionStorage.getItem("user") : sessionStorage.getItem("guest");
    }
}
</script>