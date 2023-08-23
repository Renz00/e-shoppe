<template>
  <v-container class="my-10">
    <v-row>
      <v-col>
        <!-- Listening to emitCartItemCount from child component -->
        <ProductCardLg @emitCartItemCount="setCartItemCount"/>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col>
        <div class="text-h4 mb-5">
          Similar products
        </div>
        <Products :products="simProducts" @emitSetCartItemCount="setCartItemCount"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import ProductCardLg from '@/components/ProductCardLg.vue'
import Products from '@/components/Products.vue'
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

//simProducts - array of products with similar category
const { products, simProducts, selectedProduct } = storeToRefs(useProductStore())
const { setCartItemCount, fetchSimilarProducts, fetchSelectedProduct } = useProductStore()

onMounted ( async () => {
  // await fetchSelectedProduct()
  await fetchSimilarProducts('smartphones')
})
</script>
