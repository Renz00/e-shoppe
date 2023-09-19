<template>
    <v-overlay class="justify-center align-center" v-model="overlayValue">
      <v-alert
        closable
        icon="mdi-check"
        title="Info"
        text="Item added to Cart!"
        type="success"
      >
        <template v-slot:close>
          <v-btn icon="mdi-close" @click="emits('emitSetOverlay', false)"></v-btn>
        </template>
      </v-alert>
    </v-overlay>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    overlay: Boolean
})
const emits = defineEmits(['emitSetOverlay'])
const overlayValue = computed(()=>{
    return props.overlay
})
</script>