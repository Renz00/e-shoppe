<template>
  <div id="title">
    <v-sheet height="700" v-if="products.length<=0 && !isLoadingProducts">
      <div class="d-flex align-center justify-center fill-height">
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
