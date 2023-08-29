<template>
  <v-container class="my-5">
    <v-row class="mx-4 mx-md-2">
      <v-col>
        <div class="text-h6 mb-3">Your Order #347322 is on the way!</div>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="elevation-2" variant="outlined">
              <v-container>
                <v-row>
                  <v-col>
                    <div class="text-subtitle-2 pt-0">
                      Shipping Address
                    </div>
                    <div class="text-body-2"> Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="text-subtitle-2 pb-2">
                      Items
                    </div>
                    <v-list lines="one" height="290">
                    <v-list-item
                      class="mb-2"
                      variant="outlined"
                      v-for="n in cartItemCount"
                      :key="n"
                    >
                      <v-row>
                        <v-col>
                          <div class="text-subtitle-2">Product {{ n }}</div>
                          <div class="text-body-2">Quantity: 1</div>
                        </v-col>
                        <v-col class="d-flex justify-center align-center">
                          <div class="text-subtitle-2">Product Price</div>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </v-list>
                  </v-col>
                </v-row>
             
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <OrderSummary :disableOrderSummaryButtons="disableOrderSummaryButtons"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import OrderSummary from "@/components/orders/OrderSummary.vue"

//Props from router and App.vue
const props = defineProps({
    disableOrderSummaryButtons: Boolean,
    cartItemCount: Number
  })

</script>
