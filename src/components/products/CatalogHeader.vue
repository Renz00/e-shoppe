<template>
  <v-container>
  <v-row class="align-center">
    <v-col class="px-0" cols="12" lg="8" md="8">
        <span class="text-h4 mr-3">Our Products</span>
      </v-col>
    <v-col cols="12" lg="4" md="4" sm="6" width="auto">
      <CatalogFilter @emitSetCategory="setCategory"/>
    </v-col>
  </v-row>
  </v-container>

</template>

<script setup>
import CatalogFilter from './CatalogFilter.vue';

const props = defineProps({
    category: String,
    showLinks: Boolean
})

const emits = defineEmits(['emitSetCategory'])

const setCategory = (selectedCategory) =>{
  emits('emitSetCategory', selectedCategory)
}


</script>
