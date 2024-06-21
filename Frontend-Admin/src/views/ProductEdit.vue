<template>
    <div v-if="book" class="page">
        <ProductForm
            :book="book"
            :type="type"
            @submit:book="updateProduct"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import ProductForm from '@/components/ProductForm.vue';
    import ProductService from '@/services/product.service';
    

    export default {
        components: {
            ProductForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                book: null,
                message: "",
                type: "Chỉnh sửa sản phẩm",
            };
        },
        methods: {
            async getProduct(id) {
                try {
                    this.book = await ProductService.get(id); 
                } catch (error) {
                    console.log(error);

                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$router.path.split("/").slice(1)
                        },
                        query: this.$router.query,
                        hash: this.$router.hash,
                    });
                }
            },

            async updateProduct(data) {
                try {
                    await ProductService.update(this.book._id, data);
                    alert("Sách được cập nhật thành công");
                    this.$router.push({ name: "homeBook" });
                } catch (error) {
                    console.log(error);
                }
            },

        },
        created() {
            this.getProduct(this.id),
            this.message = "";
        },
    };
</script>