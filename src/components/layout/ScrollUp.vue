<template>
     <v-overlay
      class="d-flex justify-end align-end" v-model="fab" 
      location-strategy="static" scroll-strategy="reposition" :scrim="false">
        <div>
          <v-btn class="mr-3 mb-3" @click="scollUp" icon="mdi-arrow-up" color="primary"></v-btn>
        </div>
      </v-overlay>
</template>
<script setup>
import {ref} from "vue"
const emits = defineEmits(['emitScrollUp'])
const fab = ref(true)

const scollUp = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

</script>