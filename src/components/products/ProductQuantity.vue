<template>
    <v-btn variant="text" icon="mdi-minus" @click="emits('emitDecQuantity')"></v-btn>
    <div style="width: 40px;" class="d-flex justify-center align-center text-subtitle-2">{{ productQuantity }}</div>
    <v-btn variant="text" icon="mdi-plus" @click="emits('emitIncQuantity')"></v-btn>
</template>

<script setup>
const props = defineProps({
    productQuantity: Number
})
const emits = defineEmits(['emitDecQuantity', 'emitIncQuantity'])
</script>