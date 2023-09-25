<template>
    <v-overlay class="justify-center align-center" v-model="overlay">
      <v-alert
        closable
        icon="mdi-check"
        title="Info"
        text="Item added to Cart!"
        type="success"
      >
        <template v-slot:close>
          <v-btn icon="mdi-close" @click="overlay = false"></v-btn>
        </template>
      </v-alert>
    </v-overlay>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'
const { overlay } = storeToRefs(useProductStore())

</script>