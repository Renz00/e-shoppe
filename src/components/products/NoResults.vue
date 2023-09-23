<template>
   <v-sheet height="800" v-if="!isLoadingProducts && productsLength<=0">
      <div class="d-flex justify-center fill-height mt-15">
          <span class="text-h4">Sorry, No results.</span>
      </div>
    </v-sheet>
</template>

<script setup>
const props = defineProps({
  isLoadingProducts: Boolean,
  productsLength: Number
})
</script>
