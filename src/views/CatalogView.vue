<template>
       <v-container class="mt-5 px-10" fluid>
        <v-row>
            <v-col cols="12" class="pl-7">
                <div class="text-h6">
                    Showing {{ uppercaseProductCategory }}
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="3" md="3" class="pr-7 pl-7 pr-md-0 pl-md-5 fill-height">
                <v-expansion-panels v-model="panel">
                    <v-expansion-panel>
                        <v-expansion-panel-title>Filters <v-icon icon="mdi-filter" size="small"></v-icon></v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <FilterMenu/>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
            <v-col cols="12" lg="9" md="9">
                <Loader :isLoadingProducts="isLoadingProducts"/>
                <Products :products="products" :isLoadingProducts="isLoadingProducts" @emitSetCartItemCount="setCartItemCount"/>
                <Pagination v-if="!isLoadingProducts && products.length>0"/>
            </v-col>
        </v-row>
        <ScrollUp />
       </v-container>
</template>

<script setup>
import Products from '@/components/products/Products.vue';
import FilterMenu from '@/components/products/FilterMenu.vue';
import Pagination from '@/components/products/Pagination.vue';
import Loader from '@/components/layout/Loader.vue';
import ScrollUp from '@/components/layout/ScrollUp.vue';
import { useDisplay } from 'vuetify'
import { onMounted, computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

const { products, isLoadingProducts } = storeToRefs(useProductStore())
const { setCartItemCount, handlePaginatedProducts } = useProductStore()

const props = defineProps({
    productCategory: String,
    mobileView: Boolean
})

const { name } = useDisplay()
const panel = ref([0, 1])

// const width = computed(() => {
//     // name is reactive and
//     // must use .value
//     switch (name.value) {
//         case 'xs': return '50%'
//         case 'sm': return '50%'
//     }
//     return '100%'
// })

const uppercaseProductCategory = computed(() => {
    //Capitalize the first letter of a string
    return props.productCategory.charAt(0).toUpperCase() + props.productCategory.slice(1)
})

onMounted ( async () => {
  await handlePaginatedProducts()
})
</script>
