<template>
  <v-container class="mt-5">
    <v-row class="mt-5">
      <v-col>
        <!-- Listening to emitCartItemCount from child component -->
        <ProductCardLg :productId="productId"/>
      </v-col>
    </v-row>
    <v-row class="mt-5" id="title">
      <v-col>
        <div class="text-h4 mb-5">
          Similar products
        </div>
        <Products :products="products" v-if="!isLoadingProducts"/>
        <Pagination v-if="!isLoadingProducts && products.length>0" />
      </v-col>
    </v-row>
    <Loader :isLoadingProducts="isLoadingProducts" v-if="isLoadingProducts"/>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import ProductCardLg from '@/components/products/ProductCardLg.vue'
import Products from '@/components/products/Products.vue'
import Pagination from '@/components/products/Pagination.vue';
import Loader from '@/components/layout/Loader.vue';
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

//simProducts - array of products with similar category
const { products, isLoadingProducts } = storeToRefs(useProductStore())
const { handleFilterProducts } = useProductStore()

const props=defineProps({
  productId: String
})

onMounted ( async () => {

  const filters = {
    'category': [1], // 1 is cosmetics
    'rating' : [5, 4, 3],
    'min_price': 0,
    'max_price': 50000
  }
  await handleFilterProducts(filters)
})
</script>
