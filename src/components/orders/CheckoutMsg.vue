<template>
    <v-overlay class="justify-center align-center" v-model="checkoutOverlay">
      <v-alert
        closable
        icon="mdi-close"
        title="Error"
        text="Please provide all required information"
        type="error"
      >
        <template v-slot:close>
          <v-btn icon="mdi-close" @click="checkoutOverlay = false"></v-btn>
        </template>
      </v-alert>
    </v-overlay>
</template>

<script setup>
import { watchEffect } from 'vue'
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
const { checkoutOverlay } = storeToRefs(useOrderStore())

//Closes overlay alert after 2 secs if value is true
//watchEffect will watch the value of whatever veriable is referrence within the callback function
watchEffect(() => {
  if (checkoutOverlay.value) {
    setTimeout(() => {
        checkoutOverlay.value = false;
    }, 1500);
  }
})

</script>