<template>
     <v-list lines="two" class="py-0 my-0 mx-5 mx-md-0 overflow-y-auto" width="auto" :max-height="cartItemsHeight">
        <v-list-item class="pa-0 mb-3 elevation-1" v-for="n in cartItemCount" :key="n" variant="outlined">
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
                            <v-col class="px-0">
                                Product Name
                            </v-col>
                        </v-row>
                        <v-row class="my-0">
                            <div class="text-subtitle-2">
                                Product Category | <v-icon icon="mdi-star" color="yellow"></v-icon> 4.09
                            </div>
                        </v-row>
                        
                        <v-row class="justify-center align-center">
                            <v-col cols="6" sm="4" class="px-0 text-subtitle-2">
                                <v-row class="my-2">
                                    <ProductQuantity @emitIncQuantity="incQuantity" @emitDecQuantity="decQuantity" :productQuantity="productQuantity"/>
                                </v-row>
                            </v-col>
                            <v-col cols="6" sm="8" class="text-subtitle-2">Product Price</v-col>
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

const props = defineProps({
    disableCartItemsButtons: Boolean,
    cartItemCount: Number,
    cartItemsHeight: Number
})

const productQuantity = ref(1);
const imgload = ref(false)

const incQuantity = () =>{
  if (productQuantity.value<10){
    productQuantity.value++
  }
};

const decQuantity = () =>{
  if (productQuantity.value>1){
    productQuantity.value--
  }
};

</script>
