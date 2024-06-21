<script>
export default {
    props: {
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["remove:removeProduct"]["edit:product"],
    methods: {
        removeProduct(id) {
            this.$emit("remove:removeProduct", id);
        },
        editProduct(id) {
            this.$emit("edit:product", id);
        }

    }
};
</script>

<template>
    <ul class="list-group" style="height: 400px; overflow: auto; width: 80%; margin: 0 auto;">
        <li class="list-group-item d-flex justify-content-between" style="" v-for="(book, index) in books"
            :key="book.id" :class="{ 'active': index === activeIndex }">
            <div>
                <img :src="book.image" style="width: 40px; margin-right: 10px;">
                    {{ book.name }}
            </div>
            <div>
                <button class="btn btn-sm btn-outline-warning mx-2" @click="editProduct(book._id)">
                    <i class="fas da-edit"></i> Chỉnh sửa
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="removeProduct(book._id)">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>

        </li>


    </ul>
</template>