
<template>
    <div class="row m-1">
        <div class="col-1 border-bottom border-dark my-1">
            <button class="btn btn-primary" style="width: 100%;" @click="backPage"><i class="fa-solid fa-arrow-left fs-3" ></i></button>
        </div>
        <div class="col-11 border-bottom border-dark my-1" style="min-height: 70px;">
            <h1 class="text-center">{{ type }}</h1>
        </div>
        <Form
        @submit="submitProduct"
        :validation-schema="contactFormSchema"
        class="col-8 row"
        >
        <div class="col-6">
            <div>
                <h3 class="text-center">Thông tin cơ bản</h3>
            </div>
            <div class="form-group">
            <label for="id">Mã sản phẩm:</label>
            <Field
                name="id"
                type="text"
                class="form-control"
                v-model="bookLocal._id"
            />
            <ErrorMessage name="id" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="name">Tên sản phẩm:</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="bookLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="image">Url hình:</label>
            <Field
                name="image"
                type="url"
                class="form-control"
                id="image"
                v-model="bookLocal.image"
            />
            <ErrorMessage name="image" class="error-feedback"/>
        </div>
         <div class="form-group">
            <label for="type">Thể loại:</label>
            <Field
                name="type"
                type="text"
                class="form-control"
                v-model="bookLocal.category"
            />
            <ErrorMessage name="type" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="nxb">Nhà xuất bản:</label>
            <Field
                name="nxb"
                type="text"
                class="form-control"
                v-model="bookLocal.publisher"
            />
            <ErrorMessage name="nxb" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="price">Giá:</label>
            <Field
                name="price"
                type="text"
                inputmode="numeric" 
                class="form-control"
                v-model="bookLocal.price"
            />
            <ErrorMessage name="price" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="sq">Số lượng:</label>
            <Field
                name="sq"
                type="number"
                class="form-control"
                v-model="bookLocal.quantity"
            />
            <ErrorMessage name="sq" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="des">Mô tả:</label>
            <textarea
                name="des"
                class="form-control"
                v-model="bookLocal.description"
            >
                
            </textarea>
            <ErrorMessage name="des" class="error-feedback"/>
        </div>
        </div>
        <div class="col-6">
            <div>
                <h3 class="text-center">Thông số sản phẩm</h3>
            </div>
            <div class="form-group">
                <label for="nn">Màn hình:</label>
                <Field
                    name="nn"
                    type="text"
                    class="form-control"
                    v-model="bookLocal.properties.screen"
                />
                <ErrorMessage name="nn" class="error-feedback"/>
            </div>
            <div class="form-group">
                <label for="nn5">Camera:</label>
                <Field
                    name="nn5"
                    type="text"
                    class="form-control"
                    v-model="bookLocal.properties.camera"
                />
                <ErrorMessage name="nn5" class="error-feedback"/>
            </div>
        
            <div class="form-group">
                <label for="nn1">Ram:</label>
                <Field
                    name="nn1"
                    type="text"
                    class="form-control"
                    v-model="bookLocal.properties.ram"
                />
            </div>
            <div class="form-group">
                <label for="nn2">Rom: </label>
                <Field
                    name="nn2"
                    type="text"
                    class="form-control"
                    v-model="bookLocal.properties.rom"
                />
            </div>
            <div class="form-group">
                <label for="nn3">Chíp xử lí: </label>
                <Field
                    name="nn3"
                    type="text"
                    class="form-control"
                    v-model="bookLocal.properties.cpu"
                />
            </div>
            <div class="form-group">
                <label for="nn4">Dung lượng pin: </label>
                <Field
                    name="nn4"
                    type="text"
                    class="form-control"
                    v-model="bookLocal.properties.pin"
                />
            </div>
        </div>

        <div class="form-group pt-2">
                <button class="btn btn-primary me-2" style="width: 150px;"><i class="fas fa-save"></i> Lưu</button>
                <button 
                    v-if="type=='Thêm sản phẩm'"
                    type="button"
                    class="ml-2 btn btn-secondary"
                    @click="refeshForm"
                    style="width: 150px;"
                >
                <i class="fas fa-redo"></i> Làm mới
                </button>
        </div>
        </Form>
        <div class="col-4">
            <div>
                <h3 class="text-center">Hình ảnh</h3>
            </div>
            <img :src="bookLocal.image" style="width: 400px;height: auto;">
        </div>
    </div>
    
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:book", "delete:book"],
        props: {
            book: { type: Object, required: true },
            type: { type: String }
        },
        data() {
            const contactFormSchema = yup.object().shape({
                
            });
            return {
                bookLocal: this.book,
                contactFormSchema,
                type: this.type,
            };
        },
        methods: {
            submitProduct() {
                this.$emit("submit:book", this.bookLocal);
            },
            refeshForm() {
                this.bookLocal = {
                    _id: "",
                    properties: {
                        screen: null,
                        ram: null,
                        rom: null,
                        cpu: null,
                        camera: null,
                        pin: null
                    }
                }
            },
            backPage() {
                this.$router.go(-1);
            }
            
        },
    };
</script>

<style scoped>
    @import "@/assets/form.css";
</style>