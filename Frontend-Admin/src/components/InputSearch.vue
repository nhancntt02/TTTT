<script>
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>

<template>
<div class="input-group" style="width: 80%;">
    <input
        type="text"
        class="form-control"
        placeholder="Nhập thông tin cần tìm"
        :value="modelValue"
        @input="updateModelValue"
        @keyup.enter="submit"
    />

    
    <button
        class="btn btn-outline-secondary"
        type="button"
        @click="submit"
    >
        <i class="fas fa-search"></i> Tìm kiếm
    </button>

</div>
</template>