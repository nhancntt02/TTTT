<script>
export default {
   props: {
       book: { type: Object, required: true },
   },
    computed: {
        formatPrice() {
            return  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.book.price);
        }
    },

};
</script>

<template>
   <div class="row">
       <!-- <div class="col-4">
            <img :src="book.hinh" style="width: 100%;" />
        </div> -->
        <div class="col-8">
            <div class="p-1">
                <strong>Tên:</strong>
                {{ book.name }}
            </div>
            <div class="p-1">
                <strong>Thể loại:</strong>
                {{ book.category }}
            </div>
            
            <div class="p-1">
                <strong>Nhà xuất bản:</strong>
                {{ book.publisher }}
            </div>
            <div class="p-1" >
                <strong>Giá:</strong>
                {{ formatPrice }}
            </div>
            <div class="p-1">
                <strong>Mô tả:</strong>
                {{ book.description }}
            </div>
        </div>
       
   </div>
</template>