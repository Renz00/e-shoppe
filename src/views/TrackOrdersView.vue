<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h6">Track Orders</div>
        <v-row>
          <v-col>
            <v-card>
              <v-container>
                <v-row>
                  <v-col>

                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col>
            <OrderSummary :disableOrderSummaryButtons="disableOrderSummaryButtons"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import OrderSummary from "@/components/ordersummary/OrderSummary.vue"

//Props from router
const props = defineProps({
    disableOrderSummaryButtons: Boolean
  })


</script>
