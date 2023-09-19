<template>
  <div>
    <v-sheet height="700" v-if="!isLoadingProducts && products.length<=0">
      <div class="d-flex justify-center fill-height mt-15">
          <span class="text-h4">Sorry, No results.</span>
      </div>
    </v-sheet>
    <ProductCardSm :products="products" v-else/>
  </div>
</template>

<script setup>
import ProductCardSm from './ProductCardSm.vue';
const props = defineProps({
  products: Array,
  isLoadingProducts: Boolean
})

</script>
