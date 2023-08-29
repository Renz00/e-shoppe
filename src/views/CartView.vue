<template>
    <v-container class="my-5">
        <v-row>
            <v-col cols="12" lg="8">
                <v-row>
                    <v-col class="py-0">
                        <span class="text-h6">
                            <span v-if="cartItemCount > 0">
                                Items in Cart
                            </span>
                            <span v-else>
                                No items in cart.
                            </span>
                        </span>
                    </v-col>
                </v-row>
                <v-row v-if="cartItemCount > 0">
                    <v-col class="d-flex justify-center align-center">
                        <CartItems :cartItemCount="cartItemCount" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row>
                    <v-col class="px-5 px-md-0" cols="12">
                        <ShippingAddress />
                    </v-col>

                </v-row>
                <v-row>
                    <v-col class="px-5 px-md-0">
                      <OrderSummary />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="px-5 px-md-0" cols="12">
                        <v-btn color="black" size="large" :to="{name: 'OrderView'}" width="100%">Checkout</v-btn>
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

const props = defineProps({
    cartItemCount: Number
})

</script>

<style scoped>
/* Handle */
::-webkit-scrollbar-thumb {
    background: #FF6E40;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #FF3D00;
}
</style>
