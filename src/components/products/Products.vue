<template>
  <div>
    <ProductCardSm :products="products"/>
    <Pagination />
  </div>
</template>

<script setup>
import ProductCardSm from './ProductCardSm.vue';
import Pagination from './Pagination.vue';

const props = defineProps({
  products: Array
})

</script>
