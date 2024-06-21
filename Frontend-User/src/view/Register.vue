<template>
<div style="display: flex; justify-content: center; align-items: center; margin: auto 0; padding: 12px;">
        <Form  :validation-schema="userFormSchema" style="width: 50%;"
            class="p-3 border rounded border-success">
            <button @click="homePage" class="btn"><i class="fa-solid fa-house"></i></button>
            <div class="text-center my-4 fs-3 pb-2  border-bottom border-3 border-success">Đăng ký</div>
            <div class="row">
                <div class="col-sm">
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="username" class="col-sm col-form-label fw-bold">Tên đăng nhập:</label>
                        <div class="col-sm-7">
                            <Field name="username" type="text" class="form-control" v-model="user.username"
                                placeholder="Nhập vào tên đăng nhập" />
                            <ErrorMessage name="username" class="error-feedback text-danger" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="password" class="col-sm col-form-label fw-bold">Mật khẩu:</label>
                        <div class="col-sm-7">
                            <Field name="password" type="password" class="form-control" v-model="user.password"
                                placeholder="Nhập vào mật khẩu" />
                            <ErrorMessage name="password" class="error-feedback text-danger" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="confirm_password" class="col-sm col-form-label fw-bold">Xác nhận mật khẩu:</label>
                        <div class="col-sm-7">
                            <Field name="confirm_password" type="password" class="form-control"
                                placeholder="Nhập lại mật khẩu" />
                            <ErrorMessage name="confirm_password" class="error-feedback text-danger" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button @click="register" type="submit" class="col btn btn-outline-success ms-4 py-2">Đăng ký</button>
                <span class="ms-3">Bạn đã có tài khoản? <router-link :to="{ name: 'login' }">Đăng
                        Nhập</router-link></span>
            </div>
        </Form>
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
        ErrorMessage,
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
                .min(4, "Mật khẩu phải ít nhất 4 ký tự.")
                .max(20,"Mật khẩu tối đa 20 ký tự."),
            confirm_password: yup
                .string()
                .required("Mật khẩu xác nhận không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự.")
                .max(20,"Mật khẩu tối đa 20 ký tự.")
                .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp.')
        });
        return {
            user: {
                username: "",
                password: "",
            },
            userFormSchema,
        }
    },
    methods: {
        async register() {
            try {
                const result = await CustomerService.createUser(this.user);
                if (result) {
                    this.$router.push({ name: "login" });
                }
            } catch (error) {
                console.log(error);
            }
        },
        homePage() {
            this.$router.push({name: 'home'});
        }
    }
}
</script>