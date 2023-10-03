<template>
    <v-container class="mt-5 mb-10">
        <v-row class="mb-10">
            <v-col cols="12" lg="8">
                <div class="text-h6 mb-3">
                    <span>
                        Items in Cart
                    </span>
                  
                </div>
                <CartItems :cartItemsHeight="cartItemsHeight" v-if="cartItems.length>0"/>
                <div v-else>
                    No items in cart :(
                </div>
            </v-col>
            <v-col>
                <v-row>
                    <v-col class="px-8 px-md-2 pt-2 pt-lg-14" cols="12">
                        <ShippingAddress />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="px-8 px-md-2">
                      <OrderSummary />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="px-8 px-md-2" cols="12">
                        <v-btn color="black" size="large" @click="checkout()" :disabled="cartItems.length>0?false:true" width="100%">Checkout</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import OrderSummary from '@/components/orders/OrderSummary.vue';
import ShippingAddress from '@/components/orders/ShippingAddress.vue';
import CartItems from '@/components/products/CartItems.vue';

import { onUnmounted } from 'vue'
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'
import { useOrderStore } from '../store/order-store'

const { cartItems } = storeToRefs(useProductStore())
const { getCartItemCount } = useProductStore()
const { handleCheckout  } = useOrderStore()

const props = defineProps({
    cartItemCount: Number,
    cartItemsHeight: Number
})

const checkout = async () =>{
    if (cartItems.value.length>0){
        await handleCheckout(cartItems.value)
    }
}

onUnmounted(()=>{
    //Initializes cart item count
    getCartItemCount()
})

</script>
