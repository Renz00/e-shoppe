<template>
  <div>
    <ProductCardSm :products="products" @emitSetCartItemCount="emits('emitSetCartItemCount')"/>
    <Pagination />
  </div>
</template>

<script setup>
import ProductCardSm from './ProductCardSm.vue';
import Pagination from '../layout/Pagination.vue';

const props = defineProps({
  products: Array
})

const emits = defineEmits(['emitSetCartItemCount'])

</script>
