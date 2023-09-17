<template>
  <v-container class="mt-5 mb-10">
    <v-row>
      <v-col class="px-5 px-md-0" cols="12">
        <div class="text-h6 mb-3">Your Order #347322 is being processed</div>
          <v-card class="elevation-1" variant="outlined" height="auto">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-row class="justify-center align-center text-center">
                    <v-col cols="4">
                      <div class="text-subtitle-2 pb-2">
                        <v-icon icon="mdi-package-variant"></v-icon>
                        Packing
                      </div>
                    </v-col>
                    <v-col cols="4">
                      <div class="text-subtitle-2 pb-2 gray-font" color="gray">
                        <v-icon icon="mdi-truck-outline"></v-icon>
                        In Transit
                      </div>
                    </v-col>
                    <v-col cols="4">
                      <div class="text-subtitle-2 pb-2 gray-font">
                        <v-icon icon="mdi-door"></v-icon>
                        Arrived!
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col class="mx-2">
                      <v-progress-linear model-value="30" color="success" height="10" striped></v-progress-linear>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-10">
      <v-col cols="12" lg="8">
        <v-row v-if="cartItemCount > 0">
          <v-col>
            <CartItems :cartItemCount="cartItemCount" :cartItemsHeight="cartItemsHeight" :disableCartItemsButtons="disableCartItemsButtons"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col class="px-5 px-md-0" cols="12">
            <ShippingAddress :disableOrderSummaryButtons="disableOrderSummaryButtons"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="px-5 px-md-0">
            <OrderSummary :disableOrderSummaryButtons="disableOrderSummaryButtons"/>
          </v-col>
        </v-row>
        <v-row>
            <v-col class="px-5 px-md-0" cols="12">
                <v-btn color="black" size="large" width="100%">Cancel Order</v-btn>
            </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import OrderSummary from "@/components/orders/OrderSummary.vue"
import ShippingAddress from "@/components/orders/ShippingAddress.vue"
import CartItems from "@/components/products/CartItems.vue"

//Props from router and App.vue
const props = defineProps({
  disableOrderSummaryButtons: Boolean,
  disableCartItemsButtons: Boolean,
  cartItemCount: Number,
  cartItemsHeight: Number
})

</script>
