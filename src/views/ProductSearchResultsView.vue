<template>
    <v-container class="mt-5 mb-10">
        <AddToCart :overlay="overlay" @emitSetOverlay="overlay=false"/>
            <v-row class="mx-5 mx-md-0">
                <v-col cols="9">
                    <div class="text-h6">Results for "{{ currentSearchText }}"</div>
                </v-col>
                <v-col cols="3" class="d-flex justify-end">
                    <ProductLayout @emitSetLayout="setLayout" />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="mx-10" v-if="layout=='list'">
                    <ProductList :products="products" :isLoading="isLoadingProducts"/>
                </v-col>
                <v-col class="mx-10" v-if="layout=='grid'">
                    <ProductCardSm :products="products" :isLoading="isLoadingProducts"/>
                </v-col>

            </v-row>
            <v-row class="justify-center align-center">
                <Pagination />
            </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ProductList from '@/components/products/ProductList.vue';
import ProductCardSm from '@/components/products/ProductCardSm.vue';
import Pagination from '@/components/products/Pagination.vue';
import ProductLayout from '@/components/layout/ProductLayout.vue';
import AddToCart from '@/components/products/AddToCart.vue';

import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'
const { products, isLoadingProducts, overlay, currentSearchText } = storeToRefs(useProductStore())
const { handleSearchProducts} = useProductStore()

const layout = ref('list')

const setLayout = (selectedLayout) => {
    layout.value = selectedLayout
}

onMounted(async()=>{
    var search = ''
    if (sessionStorage.getItem('search')!=null){
        search  = sessionStorage.getItem('search')
    }
    else {
        search = currentSearchText.value 
    }
    await handleSearchProducts(search)
})

onUnmounted(() => {
    if (sessionStorage.getItem('search')!=null){
        sessionStorage.removeItem('search')
    }
})

</script>
