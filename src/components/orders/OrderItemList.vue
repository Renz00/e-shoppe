<template>
    <v-list lines="two" class="py-0 my-0 mx-5 mx-md-0 overflow-y-auto" width="auto" :max-height="800">
       <v-list-item max-height="181" class="pa-0 mb-3 elevation-1" v-for="product in orderProducts" :key="product.id" variant="outlined">
           <v-row>
               <v-col class="px-0 px-sm-3" cols="4" sm="3">
                   <v-img @loadstart="imgload = true" @load="imgload = false"
                       lazy-src="https://picsum.photos/800/1000" width="auto"
                       height="180" src="https://picsum.photos/800/1000" cover>
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
                       <v-row class="mx-1 mx-md-0 text-subtitle-1">
                           <v-col class="px-0 text-truncate">
                               {{ product.product_name }}
                           </v-col>
                       </v-row>
                       <v-row class="my-0 mx-1 mx-md-0">
                           <div class="text-subtitle-2">
                               {{ setCategory(product.product_category) }} | <v-icon icon="mdi-star" color="yellow"></v-icon>  {{ product.product_rating }}
                           </div>
                       </v-row>
                       <v-row>
                        <v-col cols="6" sm="6" class="px-0 mx-4">
                                <div>
                                    <span class="text-subtitle-1 font-italic" style="text-decoration: line-through; color: gray;">{{ '₱'+product.product_price.toLocaleString() }}</span>
                                    <span class="text-subtitle-1">{{ ' ₱'+getDiscountPrice(product.product_price, product.product_discount)+' ' }}</span>
                                    <!-- <span class="text-subtitle-2">{{ product.product_discount+'% OFF' }}</span> -->
                                </div>
                        </v-col>
                       </v-row>
                   </v-container>
               </v-col>
           </v-row>
       </v-list-item>
   </v-list>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { storeToRefs } from 'pinia';
// import { useOrderStore } from '@/store/order-store'

// const { getCartItemCount } = useOrderStore()
// const { cartItemCount } = storeToRefs(useOrderStore())

const props = defineProps({
   orderProducts: Array
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

const getDiscountPrice = (price, discount) =>{
    const discPrice = (discount/100)*price
    price = price-discPrice
    return price.toLocaleString()
}
</script>
