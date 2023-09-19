<template>
     <v-btn-toggle
        v-model="toggle"
        color="error"
        variant="text"
        density="compact"
        mandatory
    >
    <v-btn @click="emits('emitSetLayout', 'list')" icon="mdi-format-list-checkbox"></v-btn>
    <v-btn @click="emits('emitSetLayout', 'grid')" icon="mdi-view-grid-outline"></v-btn>
    </v-btn-toggle>
</template>

<script setup>
import { ref } from 'vue'

const emits = defineEmits(['emitSetLayout'])

const toggle = ref(null)

</script>