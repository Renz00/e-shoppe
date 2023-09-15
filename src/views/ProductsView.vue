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
      <v-sheet height="700" v-if="isLoadingProducts">
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="primary"
              size="large"
              indeterminate
            ></v-progress-circular>
          </div>
      </v-sheet>
      <LoadMore v-if="!isLoadingProducts" :isLoadingProducts="isLoadingProducts" :productLimit="productLimit" @emitLoadMore="loadMore"/>
      <ScrollUp />
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Products from '@/components/products/Products.vue'
import Banner from "@/components/layout/Banner.vue"
import CatalogHeader from "@/components/products/CatalogHeader.vue"
import LoadMore from '@/components/products/LoadMore.vue'
import ScrollUp from '@/components/layout/ScrollUp.vue'
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

const { products, isLoadingProducts, productLimit } = storeToRefs(useProductStore())
const { fetchAllProducts, setCartItemCount, handleLoadMore } = useProductStore()

const scrollInvoked = ref(0)

const loadMore = async () => {
  console.log('clicked')
  await handleLoadMore()
}

onMounted ( async () => {
  await fetchAllProducts()
})
</script>

<style scoped>

</style>
