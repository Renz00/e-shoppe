<template>
    <v-container class="mt-5 mb-10">
        <v-row>
            <v-col cols="6">
                <div class="text-h6">Results for "Something"</div>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <v-btn-toggle
                v-model="toggle"
                color="error"
                variant="text"
                density="compact"
                mandatory
              >
                <v-btn @click="layout='list'" icon="mdi-format-list-checkbox"></v-btn>
                <v-btn @click="layout='grid'" icon="mdi-view-grid-outline"></v-btn>
              </v-btn-toggle>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="mx-10" v-if="layout=='list'">
                <ProductList :cartItemCount="20"/>
            </v-col>
            <v-col class="mx-10" v-if="layout=='grid'">
                <ProductGrid :cartItemCount="20"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductList from '@/components/products/ProductList.vue';
import ProductGrid from '@/components/products/ProductGrid.vue';

import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'
const { products, isLoadingProducts, productCurrentPage } = storeToRefs(useProductStore())
const { handlePaginatedProducts, handleSearchProducts} = useProductStore()

const toggle = ref(null)
const layout = ref('list')

onMounted(async()=>{
    await handleSearchProducts()
})

</script>
