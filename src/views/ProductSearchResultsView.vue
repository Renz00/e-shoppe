<template>
    <v-container class="mt-5 mb-10">
        <AddToCart :overlay="overlay" @emitSetOverlay="overlay=false"/>
        <div v-if="!isLoadingProducts && products.length>0">
            <v-row class="mx-5 mx-md-0">
                <v-col cols="9">
                    <div class="text-h6">Results for "{{ searchValue }}"</div>
                </v-col>
                <v-col cols="3" class="d-flex justify-end">
                    <ProductLayout @emitSetLayout="setLayout" />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="mx-10" v-if="layout=='list'">
                    <ProductList :products="products" @emitSetCartItemCount="addToCart" :isLoadingProducts="isLoadingProducts"/>
                </v-col>
                <v-col class="mx-10" v-if="layout=='grid'">
                    <ProductCardSm :products="products" @emitSetCartItemCount="addToCart" :isLoadingProducts="isLoadingProducts"/>
                </v-col>

            </v-row>
            <v-row class="justify-center align-center">
                <Pagination />
            </v-row>
        </div>
        <div v-if="isLoadingProducts">
            <v-row class="justify-center align-center">
                <Loader :isLoadingProducts="isLoadingProducts"/>
            </v-row>
        </div>
    </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductList from '@/components/products/ProductList.vue';
import ProductCardSm from '@/components/products/ProductCardSm.vue';
import Pagination from '@/components/products/Pagination.vue';
import Loader from '@/components/layout/Loader.vue';
import ProductLayout from '@/components/layout/ProductLayout.vue';
import AddToCart from '@/components/products/AddToCart.vue';

import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'
const { products, isLoadingProducts, isLoadingSearchItems } = storeToRefs(useProductStore())
const { handleSearchProducts, setCartItemCount} = useProductStore()

const layout = ref('list')
const overlay=ref(false)

const searchValue = computed(()=>{
    return sessionStorage.getItem('search')
})

const addToCart = () => {
  overlay.value = true
  setCartItemCount()
}

const setLayout = (selectedLayout) => {
    layout.value = selectedLayout
}

onMounted(async()=>{
    await handleSearchProducts(sessionStorage.getItem('search'))
})

</script>
