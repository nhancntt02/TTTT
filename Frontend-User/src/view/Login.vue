<template>
    <div class="container">
        <div class="d-flex justify-content-center">
            <Form @submit="login" :validation-schema="userFormSchema" style="width: 50%" class="p-3 border rounded border-success mt-5">
                <router-link to="/"><i class="fa-solid fa-house"></i></router-link>
                <div class="text-center my-3 fs-2 pb-2 border-bottom border-3 border-success fw-bold">Đăng nhập</div>
                <div class="row mb-4 mx-2 px-3 pt-3">
                    <label for="username" class="col-sm-4 col-form-label fw-bold">Tên đăng nhập:</label>
                    <div class="col-sm-8">
                        <Field name="username" type="text" class="form-control" v-model="user.username"
                            placeholder="Nhập vào tên đăng nhập" />
                        <ErrorMessage name="username" class="error-feedback text-danger" />
                    </div>
                </div>
                <div class="row mb-4 p-3 mx-2">
                    <label for="password" class="col-sm col-form-label fw-bold">Mật khẩu:</label>
                    <div class="col-sm-8">
                        <Field name="password" type="password" class="form-control" v-model="user.password"
                            placeholder="Nhập vào mật khẩu" />
                        <ErrorMessage name="password" class="error-feedback text-danger" />
                    </div>
                </div>
                <p class="ms-4 error-feedback text-danger">{{ message }}</p>
                <div>
                    <button type="submit" class="col btn btn-outline-success ms-4 py-2">Đăng Nhập</button>
                    <span class="ms-3">Bạn chưa có tài khoản? </span><router-link :to="{ name: 'register' }">Đăng
                        Ký</router-link>
                </div>
            </Form>
        </div>
        
    </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import CustomerService from "@/services/customer.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        const userFormSchema = yup.object().shape({
            username: yup
                .string()
                .required("Tên đăng nhập không được bỏ trống.")
                .min(4, "Tên đăng nhập phải ít nhất 4 ký tự."),
            password: yup
                .string()
                .required("Mật khẩu không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự."),
        });
        return {
            user: {
                username: "",
                password: ""
            },
            userFormSchema,
            message: '',
        }
    },
    methods: {
        async login() {
            try {
                const data = {
                    username: this.user.username,
                    password: this.user.password
                }
                const rs = await CustomerService.login(data);
                
                if(rs) {
                    sessionStorage.setItem("user", this.user.username);
                    this.$router.push({ name: 'home' });
                } else {
                    this.message = "Tài khoản hoặc mật khẩu không đúng";
                }
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>