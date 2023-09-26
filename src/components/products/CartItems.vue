<template>
     <v-list lines="two" class="py-0 my-0 mx-5 mx-md-0 overflow-y-auto" width="auto" :max-height="cartItemsHeight">
        <v-list-item max-height="181" class="pa-0 mb-3 elevation-1" v-for="item in cartItems" :key="item.id" variant="outlined">
            <v-row>
                
                <v-col class="px-0 px-sm-3" cols="4" sm="3">
                    <v-img @loadstart="imgload = true" @load="imgload = false"
                        lazy-src="https://picsum.photos/800/1000" width="auto"
                        height="180" src="https://picsum.photos/800/1000" cover>
                        <div class="ml-4 mt-1 ml-sm-1" v-if="!disableCartItemsButtons">
                            <v-btn color="error" size="small">Remove</v-btn>
                        </div>
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular style="height:200px;" color="primary"
                                    indeterminate></v-progress-circular>
                            </div>
                        </template>
                    </v-img>
                </v-col>
                <v-col class="pa-0 pa-sm-3" cols="8" sm="9">
                    <v-container>
                        <v-row class="text-subtitle-1">
                            <v-col class="px-0 text-truncate">
                                {{ item.name }}
                            </v-col>
                        </v-row>
                        <v-row class="my-0">
                            <div class="text-subtitle-2">
                                {{ setCategory(item.category) }} | <v-icon icon="mdi-star" color="yellow"></v-icon>  {{ item.rating }}
                            </div>
                        </v-row>
                        
                        <v-row :class="disableCartItemsButtons ? '' : 'justify-center align-center'">
                            <v-col cols="6" sm="4" class="px-0 text-subtitle-2" v-if="!disableCartItemsButtons">
                                <v-row class="my-2">
                                    <ProductQuantity :productId="item.id" :itemCount="item.count"/>
                                </v-row>
                            </v-col>
                            <v-col cols="6" sm="8" class="px-0 text-subtitle-2">
                                <div class="px-0 text-subtitle-1">{{ '₱'+item.total_price.toLocaleString() }}</div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-list-item>
    </v-list>
</template>

<script setup>
import ProductQuantity from '@/components/products/ProductQuantity.vue'
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'

const { cartItems } = storeToRefs(useProductStore())

const props = defineProps({
    disableCartItemsButtons: Boolean,
    cartItemsHeight: Number
})

const imgload = ref(false)

const setCategory = (category) => {
    switch (category){
        case 3:
            return 'Apparel'
            break
        case 1:
            return 'Gadgets'
            break
        case 2:
            return 'Cosmetics'
            break
        default:
            break
    }
}

</script>
