<template>
  <div>
    <Banner />
    <v-container>
      <v-row>
        <v-col>
          <CatalogHeader/>
        </v-col>
      </v-row>
      <Products :products="products" :isLoadingProducts="isLoadingProducts" @emitSetCartItemCount="setCartItemCount"/>
      <Loader class="mt-5" :isLoadingProducts="isLoadingProducts" v-if="isLoadingProducts"/>
      <LoadMore v-if="!isLoadingProducts && products.length>0" :isLoadingProducts="isLoadingProducts" :productLimit="productLimit" @emitLoadMore="loadMore"/>
      <ScrollUp />
    </v-container>
  </div>
</template>

<script setup>
import Products from '@/components/products/Products.vue'
import Banner from "@/components/layout/Banner.vue"
import CatalogHeader from "@/components/products/CatalogHeader.vue"
import LoadMore from '@/components/products/LoadMore.vue'
import ScrollUp from '@/components/layout/ScrollUp.vue'
import Loader from '@/components/layout/Loader.vue'
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

const { products, isLoadingProducts, productCurrentPage, productLimit } = storeToRefs(useProductStore())
const { handlePaginatedProducts, setCartItemCount, handleLoadMore } = useProductStore()

const loadMore = async () => {
  if (productLimit.value < 120){
    productCurrentPage.value++
    await handleLoadMore()
  }
}

onMounted ( async () => {
  products.value = []
  await handlePaginatedProducts()
})
</script>

<style scoped>

</style>
