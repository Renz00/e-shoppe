<template>
     <v-overlay
      class="d-flex justify-end align-end" v-model="fab" 
      location-strategy="static" scroll-strategy="reposition" persistent :scrim="false">
        <div>
          <v-btn class="mr-3 mb-3" @click="scollUp" icon="mdi-arrow-up" color="primary"></v-btn>
        </div>
      </v-overlay>
</template>
<script setup>
import {ref, computed, watch} from "vue"
const emits = defineEmits(['emitScrollUp'])
const fab = ref(true)

// watch(
//   () => scrollAmount.value,
//   (old, new) => console.log(new)
// )

// const scrollAmount = computed(()=>{
//   window.addEventListener("scroll", function() {
//     const maxHeight = document.body.scrollHeight - window.innerHeight;
//     return (window.pageYOffset * 100) / maxHeight)
//   })
// })

const scollUp = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

</script>