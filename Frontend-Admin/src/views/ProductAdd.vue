<template>
    <div class="page">
        <ProductForm
            :book="book"
            :type="type"
            @submit:book = "addProduct"
        />
    </div>
</template>

<script>
    import ProductService from "@/services/product.service.js";
    import ProductForm from "@/components/ProductForm.vue";

    export default {
        components: {
           ProductForm,
        },
        data() {
            return{
                book:   {
                    _id: "",
                    properties: {
                        screen: null,
                        ram: null,
                        rom: null,
                        cpu: null,
                        camera: null,
                        pin: null
                    }
                },
                type: "Thêm sản phẩm"
            };
            
        },
        methods: {
            async addProduct(data) {
                try {
                    await ProductService.create(data);
                    alert("Thêm sách thành công") ;
                    this.$router.push({ name: "homeBook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    }
</script>