<template>
  <div>
    <Banner />
    <v-container>
      <v-row>
      <v-col>
        <CatalogHeader @emitSetCategory="setCategory"/>
      </v-col>
    </v-row>
      <Products :products="products" @emitSetCartItemCount="setCartItemCount"/>
      <LoadMore v-if="products.length>0"/>
    </v-container>
  </div>
</template>

<script setup>
import Products from '@/components/products/Products.vue'
import Banner from "@/components/layout/Banner.vue"
import CatalogHeader from "@/components/products/CatalogHeader.vue"
import LoadMore from '@/components/products/LoadMore.vue';
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

const { products } = storeToRefs(useProductStore())
const { fetchAllProducts, setCartItemCount } = useProductStore()

const setCategory = (selectedCategory) => {
  console.log(selectedCategory)
}


onMounted ( async () => {
  await fetchAllProducts()
})
</script>
