<template>
  <v-container class="mt-5">
    <v-row class="mt-5">
      <v-col>
        <!-- Listening to emitCartItemCount from child component -->
        <ProductCardLg />
      </v-col>
    </v-row>
    <v-row class="mt-5" id="title">
      <v-col>
        <div class="text-h4 mb-5">
          Similar products
        </div>
        <!-- <Products :products="products" v-if="!isLoadingProducts"/> -->
        <ProductCardSm :products="products" :isLoading="isLoadingProducts"/>
        <Pagination :productCategory="selectedProduct.product_category" v-if="!isLoadingProducts && products.length>0 && selectedProduct!=null" />

      </v-col>
    </v-row>
    <Loader v-if="isLoadingProducts"/>
    <AddToCart :overlay="overlay" @emitSetOverlay="overlay=false"/>
  </v-container>
</template>

<script setup>
import { onMounted,watchEffect,watch } from 'vue';
import ProductCardLg from '@/components/products/ProductCardLg.vue'
// import Products from '@/components/products/Products.vue'
import Pagination from '@/components/products/Pagination.vue';
import Loader from '@/components/layout/Loader.vue';
import ProductCardSm from '@/components/products/ProductCardSm.vue';
import AddToCart from '@/components/products/AddToCart.vue';
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

//simProducts - array of products with similar category
const { products, isLoadingProducts, selectedProduct, overlay } = storeToRefs(useProductStore())
const { handleFilterProducts, handleFetchSelectedProduct } = useProductStore()

const props=defineProps({
  productId: String
})

//Closes overlay alert after 2 secs if value is true
//watchEffect will watch the value of whatever veriable is referrence within the callback function
watchEffect(() => {
  if (overlay.value) {
    setTimeout(() => {
      overlay.value = false;
    }, 1000);
  }
})

//Watching props variable
watch(
  () => props.productId,
  async () => {
    await handleFetchSelectedProduct(props.productId)
  }
)

onMounted ( async () => {
  await handleFetchSelectedProduct(props.productId)
  const category = []
  category.push(selectedProduct.value.product_category)
  const filters = {
    'category': category, // 1 is cosmetics
    'rating' : [5, 4, 3],
    'min_price': 1,
    'max_price': 50000
  }
  await handleFilterProducts(filters)
})
</script>
