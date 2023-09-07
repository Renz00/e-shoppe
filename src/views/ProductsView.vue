<template>
  <div>
    <Banner />
    <v-container>
      <v-row>
      <v-col>
        <CatalogHeader @emitSetCategory=""/>
      </v-col>
    </v-row>
      <Products :products="products" @emitSetCartItemCount="setCartItemCount"/>
      <v-sheet height="800" v-if="products.length == 0">
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="primary"
              size="large"
              indeterminate
            ></v-progress-circular>
          </div>
      </v-sheet>
      <LoadMore v-if="products.length>0"/>
    </v-container>
  </div>
</template>

<script setup>
import Products from '@/components/products/Products.vue'
import Banner from "@/components/layout/Banner.vue"
import CatalogHeader from "@/components/products/CatalogHeader.vue"
import LoadMore from '@/components/products/LoadMore.vue';
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

const { products } = storeToRefs(useProductStore())
const { fetchAllProducts, setCartItemCount } = useProductStore()

onMounted ( async () => {
  await fetchAllProducts()
})
</script>
