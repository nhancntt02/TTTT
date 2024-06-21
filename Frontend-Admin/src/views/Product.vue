<template>
    <div class="page row m-1">
        <div class="col-12 border-bottom border-dark my-1" style="min-height: 200px;">
            <h1 class="text-center mt-5">Danh sách sản phẩm</h1>
        </div>
        <div class="row col-12 border-bottom border-dark m-0 pb-1" style="min-height: 50px;">
            <SearchProduct class="col-10" v-model="searchText" />
            <div class="col-2">
                <button class="btn btn-sm btn-outline-success " style="height: 100%;" @click="goToAddProduct">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-12">
            <ProductList v-if="filteredProductsCount > 0" 
                :books="filteredProducts" 
                v-model:activeIndex="activeIndex" 
                @remove:removeProduct="removeProduct"
                @edit:product="editProduct"
            />
            <p v-else class="fs-1 text-center">Không có sản phẩm nào.</p>
        </div>
    </div>
</template>
<script>

import ProductList from "@/components/ProductList.vue";
import ProductService from "@/services/product.service";
import SearchProduct from "@/components/InputSearch.vue";
export default {
    components: {
        SearchProduct,
        ProductList,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
            selectPub: "",
            typeC: "",
            price: 0,
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //  Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        bookStrings() {
            return this.books.map((book) => {
                const { name } = book;
                return [this.removeAccents(name)].join().toLowerCase();
            });
        },

        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredProducts() {
            if(!this.searchText){
                return this.books;
            }
            return this.books.filter((_book, index) => {
                return this.bookStrings[index].includes(this.removeAccents(this.searchText).toLowerCase());
            });


        },

        activeProduct() {
            if (this.activeIndex < 0) {
                return null;
            }
            else {

                return this.filteredProducts[this.activeIndex];
            }

        },

        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },
    methods: {
       
        removeAccents(string) {
            return string.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D')
        },
        async retrieveProducts() {
            try {
                this.books = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async removeProduct(data) {
            if (confirm("Bạn muốn xóa sản phẩm này ?")) {
                try {
                    await ProductService.delete(data);
                    this.refreshList;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async editProduct(data) {
            this.$router.push({ name: "product-edit" , params: { id: data }})
        }, 
        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
        },

        goToAddProduct() {
            this.$router.push({ name: "book-add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
}
</style>