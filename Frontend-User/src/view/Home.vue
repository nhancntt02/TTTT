<template>
        <div class="row">
        <Header></Header>
        <div class="col-12 border border-info mb-3 row p-2" >
            <div class="col-sm-6 d-flex justify-content-around ps-5">
                <div class="icon-publisher-w">
                    <img @click="clickss" class="icon-publisher" src="https://cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png" alt="">
                </div>
                <div class="icon-publisher-w">
                    <img @click="clickip" class="icon-publisher" src="https://cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png" alt="">
                </div>
                <div class="icon-publisher-w">
                    <img @click="clickop" class="icon-publisher" src="https://cdn.tgdd.vn/Brand/1/OPPO42-b_5.jpg" alt="">
                </div>
                <div class="icon-publisher-w">
                    <img @click="clickxiao" class="icon-publisher" src="https://cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png" alt="">
                </div>

            </div>
            <div class="col-sm-6 d-flex justify-content-end">
                <input type="text" class="form-control" placeholder="Nhập tên sản phẩm muốn tiềm kiếm" v-model="searchText" style="width: 80%;">
                <button @click="searchProduct" class="btn btn-outline-secondary ms-2" type="button">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
    </div>
    <Products v-if="filteredProductsCount > 0" :products="filteredProducts" @search:searchProduct="searchProduct">
    </Products>
</template>
<style>

.icon-publisher {
    width: 90%;
    height: 90%;
    border: 1px solid;
    border-radius: 25px;
}
.icon-publisher-w:hover .icon-publisher{
    border-color: aqua;
}

</style>
<script>
import ProductService from "@/services/product.service";
import Products from "@/components/Products.vue";
import Header from "@/components/AppHeader.vue"
export default
    {
        components: {
            Header,
            Products
        },
        data() {
            return {
                products: [],
                productAll: [],
                searchText: "",
            };
        },
        computed: {
            productStrings() {
                return this.products.map((product) => {
                    const { name } = product;
                    return [this.removeAccents(name)].join().toLowerCase();
                });
            },
            filteredProducts() {
                if (!this.searchText) {
                    return this.products;
                }

                return this.products.filter((_product, index) => {
                    return this.productStrings[index].includes(this.removeAccents(this.searchText).toLowerCase());
                });


            },
            filteredProductsCount() {
                return this.filteredProducts.length;
            },
        },
        methods:
        {
            
            removeAccents(string) {
                return string.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
            },

            async retrieveProducts() {
                try {
                    this.products = await ProductService.getAll();
                    this.productAll = this.products;
                }
                catch (error) {
                    console.log(error);
                }
            },
            clickss() {
                this.products = this.productAll;
                let temp = this.productAll.filter((product) => product.publisher=="Samsung");
                this.products = temp;
            },
            clickip() {
                this.products = this.productAll;
                let temp = this.productAll.filter((product) => product.publisher=="Iphone");
                this.products = temp;
            },
            clickop() {
                this.products = this.productAll;
                let temp = this.productAll.filter((product) => product.publisher=="Oppo");
                this.products = temp;
            },
            clickxiao() {
                this.products = this.productAll;
                let temp = this.productAll.filter((product) => product.publisher=="Xiaomi");
                this.products = temp;
            },
            searchProduct(data) {
                this.searchText = data;
            }
        },
        mounted() {
            if(!sessionStorage.getItem('user')) {
                sessionStorage.setItem('user', 'guest');
            }
            this.retrieveProducts();
            
        },
    }
</script>