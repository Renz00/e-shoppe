<template>
    <v-overlay class="justify-center align-center" v-model="cancelOverlay">
      <v-alert
        closable
        icon="mdi-check"
        title="Info"
        text="Order is cancelled!"
        type="info"
      >
        <template v-slot:close>
          <v-btn icon="mdi-close" @click="cancelOverlay = false"></v-btn>
        </template>
      </v-alert>
    </v-overlay>
</template>

<script setup>
import { watchEffect } from 'vue'
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
const { cancelOverlay } = storeToRefs(useOrderStore())

//Closes overlay alert after 2 secs if value is true
//watchEffect will watch the value of whatever veriable is referrence within the callback function
watchEffect(() => {
  if (cancelOverlay.value) {
    setTimeout(() => {
      cancelOverlay.value = false;
    }, 800);
  }
})

</script>