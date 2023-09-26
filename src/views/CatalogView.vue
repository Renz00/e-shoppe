<template>
       <v-container class="mt-5 px-10" id="title" fluid>
        <v-row>
            <v-col cols="9" class="pl-7">
                <div class="text-h6">
                    Showing {{ uppercaseProductCategory }}
                </div>
            </v-col>
            <v-col cols="3" class="d-flex justify-end">
                <ProductLayout @emitSetLayout="setLayout"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="3" md="3" class="pr-7 pl-7 pr-md-0 pl-md-5 fill-height">
                <v-expansion-panels v-model="panel">
                    <v-expansion-panel>
                        <v-expansion-panel-title>Filters <v-icon icon="mdi-filter" size="small"></v-icon></v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <FilterMenu :productCategory="productCategory"/>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
            <v-col cols="12" lg="9" md="9" class="px-5">
                <ProductList :products="products" :isLoading="isLoadingProducts" v-if="layout=='list'"/>
                <ProductCardSm :products="products" :isLoading="isLoadingProducts" v-if="layout=='grid'"/>
                <Pagination :productCategory="productCategory" v-if="!isLoadingProducts && products.length>0"/>
            </v-col>
        </v-row>
        <ScrollUp />
        <AddToCart />
       </v-container>
</template>

<script setup>
import FilterMenu from '@/components/products/FilterMenu.vue';
import Pagination from '@/components/products/Pagination.vue';
import ScrollUp from '@/components/layout/ScrollUp.vue';
import ProductLayout from '@/components/layout/ProductLayout.vue';
import ProductList from '@/components/products/ProductList.vue';
import ProductCardSm from '@/components/products/ProductCardSm.vue';
import AddToCart from '@/components/products/AddToCart.vue';

import { onMounted, computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

const { products, isLoadingProducts } = storeToRefs(useProductStore())
const { handleFilterProducts } = useProductStore()

const props = defineProps({
    productCategory: String,
    mobileView: Boolean
})

const panel = ref([0, 1])
const rating = ref([5, 4, 3, 2, 1])
const min = ref(1)
const max = ref(50000)
const layout = ref('grid')

const setLayout = (selectedLayout) => {
  layout.value = selectedLayout
}

//Watching props variable
watch(
  () => props.productCategory,
  async () => {
    await fetchProducts()
  }
)

const fetchProducts = async() => {
    const category = []
    switch (props.productCategory){
        case 'apparel':
            category.push(3)
            break
        case 'cosmetics':
            category.push(2)
            break
        case 'gadgets':
            category.push(1)
            break
        default:
            break
    }
    const filters = {
        'category': category,
        'rating' : rating.value,
        'min_price': min.value,
        'max_price': max.value
    }
    await handleFilterProducts(filters)
}

const uppercaseProductCategory = computed(() => {
    //Capitalize the first letter of a string
    return props.productCategory.charAt(0).toUpperCase() + props.productCategory.slice(1)
})

onMounted ( async () => {
  await fetchProducts()
})
</script>
