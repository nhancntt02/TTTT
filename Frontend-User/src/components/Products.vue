<template>

    <div class="container">
        <div class="row">
            <div v-for="product in products" class="col-6 col-sm-3 border py-4" id="item">
                <div class="item-product">
                    <img :src="product.image" alt="anh" style="width: 80%; height: auto;" class="image" @click="productInfo(product._id)">
                    <h1 class="fs-5">{{ product.name }}</h1>
                    <h1 class="fs-4 h1-price" >{{ changeMoney(product.price) }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
#item {
    background-color: white;
}
.h1-price {
    color: red;
}
.image {
    transition: all 0.4s;
}
.item-product:hover .image{
    transform: translate(0px, -10px);
}
</style>
<script>

export default {
    props: {
        products: { type: Array, default: []}
    },
    emits: ["search:searchProduct"],
    data() {
        return {
            searchText: "",
        }
    },
    computed: {
        
    },
    methods: {
        searchProduct() {
            this.$emit("search:searchProduct", this.searchText);
        },
        productInfo(id) {
            this.$router.push({ name: 'productinfo', params: { productId: id }})
        },
        changeMoney(money) {
            const VND = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
            return VND.format(money);
        }
    },
    mounted(){

    }
};
</script>
