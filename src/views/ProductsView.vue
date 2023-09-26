<template>
  <div>
    <Banner />
    <v-container>
      <v-row>
        <v-col>
          <CatalogHeader/>
        </v-col>
      </v-row>
      <v-sheet :min-height="1350">
        <AddToCart />
        <ProductCardSm :products="products"/>
        <!-- <Products :products="products" :isLoadingProducts="isLoadingProducts" @emitSetCartItemCount="setCartItemCount"/> -->
        <LoadMore v-if="!isFiltered && products.length>0" :isLoadingProducts="isLoadingProducts" :productLimit="productLimit" @emitLoadMore="loadMore"/>
        <Pagination v-if="!isLoadingProducts && isFiltered && products.length>0"/>
      </v-sheet>
      <ScrollUp />
    </v-container>
  </div>
</template>

<script setup>
import Banner from "@/components/layout/Banner.vue"
import CatalogHeader from "@/components/products/CatalogHeader.vue"
import LoadMore from '@/components/products/LoadMore.vue'
import ScrollUp from '@/components/layout/ScrollUp.vue'
import Pagination from '@/components/products/Pagination.vue'
import ProductCardSm from "@/components/products/ProductCardSm.vue"
import AddToCart from "@/components/products/AddToCart.vue"
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

const { products, isLoadingProducts, productCurrentPage, productLimit, isFiltered } = storeToRefs(useProductStore())
const { handlePaginatedProducts, handleLoadMore } = useProductStore()

const loadMore = async () => {
  if (productLimit.value < 120){
    productCurrentPage.value++
    await handleLoadMore()
  }
}

onMounted ( async () => {
  await handlePaginatedProducts()
})
</script>
