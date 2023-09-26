<template>

    <v-container class="mt-5 mb-10">
        <v-row>
            <v-col cols="9">
                <div class="text-h6">My Favourites</div>
            </v-col>
            <v-col cols="3" class="d-flex justify-end">
              <ProductLayout @emitSetLayout="setLayout"/>
            </v-col>
        </v-row>
        <v-row>
             <AddToCart />
            <v-col class="mx-10" v-if="layout=='list'" :isLoading="isLoadingFav">
              <v-sheet min-height="1350">
                <ProductList :products="favProducts" :isLoading="isLoadingFav"/>
              </v-sheet>
            </v-col>
            <v-col class="mx-10" v-if="layout=='grid'">
              <v-sheet min-height="1350">
                <ProductCardSm :products="favProducts" :isLoading="isLoadingFav"/>
              </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import ProductList from '@/components/products/ProductList.vue';
import ProductCardSm from '@/components/products/ProductCardSm.vue';
import ProductLayout from '@/components/layout/ProductLayout.vue';
import AddToCart from '@/components/products/AddToCart.vue';
import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'
import { useFavouriteStore } from '@/store/favourites-store'

const { favProducts, isLoadingFav } = storeToRefs(useFavouriteStore())
const { handleFetchFavourites} = useFavouriteStore()
const { setCartItemCount} = useProductStore()

const props = defineProps({
  cartItemCount: Number,
  mobileView: Boolean
})


const layout = ref('list')
const overlay = ref(false)

const setLayout = (selectedLayout) => {
  layout.value = selectedLayout
}

const addToCart = (orderProduct) => {
  overlay.value = true
  setCartItemCount(orderProduct)
}

//Closes overlay alert after 2 secs if value is true
//watchEffect will watch the value of whatever veriable is referrence within the callback function
watchEffect(() => {
  if (overlay.value) {
    setTimeout(() => {
      overlay.value = false;
    }, 1000);
  }
})

onMounted(async()=>{
  isLoadingFav.value = true
  await handleFetchFavourites()
})
</script>
