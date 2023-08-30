<template>
    <v-container class="mt-5 mb-10">
        <v-row>
            <v-col cols="12" lg="8">
                <v-row v-if="cartItemCount > 0">
                    <v-col>
                        <div class="text-h6 mb-3">
                          <span v-if="cartItemCount > 0">
                              Items in Cart
                          </span>
                          <span v-else>
                              No items in cart.
                          </span>
                      </div>
                        <CartItems :cartItemCount="cartItemCount" :cartItemsHeight="cartItemsHeight"/>
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row>
                    <v-col class="px-5 px-md-0 pt-2 pt-lg-14" cols="12">
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
    cartItemCount: Number,
    cartItemsHeight: Number
})

</script>