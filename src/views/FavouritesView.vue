<template>
    <v-container class="mt-5 mb-10">
        <v-row>
            <v-col cols="12">
                <div class="text-h6">My Favourites</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="mx-10">
                <CartItems :cartItemCount="cartItemCount" :cartItemsHeight="cartItemsHeight" :disableCartItemsButtons="disableCartItemsButtons"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import CartItems from '@/components/products/CartItems.vue';
//Props from router and App.vue
const props = defineProps({
  disableCartItemsButtons: Boolean,
  cartItemsHeight: Number,
  cartItemCount: Number
})

</script>