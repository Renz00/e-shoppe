<template>
     <v-overlay
      class="d-flex justify-end align-end" v-model="fab" 
      location-strategy="static" scroll-strategy="reposition" persistent :scrim="false" v-if="scroll>=100">
        <div>
          <v-btn class="mr-3 mb-3" @click="scollUp" icon="mdi-arrow-up" color="black"></v-btn>
        </div>
      </v-overlay>
</template>
<script setup>
import { ref, onMounted, onUnmounted} from "vue"

const emits = defineEmits(['emitScrollUp'])

const fab = ref(true)
const scroll = ref(null)

const scollUp = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const scrolled = (event) =>{
  scroll.value = window.scrollY
}

onMounted(()=>{
  window.addEventListener('scroll', scrolled);
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrolled);
})

</script>