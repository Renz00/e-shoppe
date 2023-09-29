<template>
   <v-card class="elevation-1" variant="outlined" width="100%" height="auto">
    <v-container>
        <v-row>
            <v-col class="text-subtitle-2 px-2 pt-2 pb-5">
                Order Summary
            </v-col>
        </v-row>
        <div class="px-2 text-subtitle-2">
            <v-row>
                <v-col>
                    Sub-total (2 Items)
                </v-col>
                <v-col>
                    Price
                </v-col>
            </v-row>
            <v-row class="my-0">
                <v-col>
                    Total Discount
                </v-col>
                <v-col>
                    DiscountPrice
                </v-col>
            </v-row>
            <v-divider class="my-2"></v-divider>
            <v-row class="py-2">
                <v-col>
                    Total
                </v-col>
                <v-col>
                    TotalPrice
                </v-col>
            </v-row>
        </div>
        <div class="pa-2">
           <Voucher :disableOrderSummaryButtons="disableOrderSummaryButtons"/>
        </div>
        <div class="pa-2">
            <Courier :disableOrderSummaryButtons="disableOrderSummaryButtons"/>
        </div>
        <div class="pa-2">
            <Payment :disableOrderSummaryButtons="disableOrderSummaryButtons"/>
        </div>
    </v-container>
  </v-card>
</template>

<script setup>
import Voucher from './Voucher.vue';
import Courier from './Courier.vue';
import Payment from './Payment.vue';
import { ref } from 'vue';

const props = defineProps({
  disableOrderSummaryButtons: Boolean,
  cardHeight: Number
})

const shippingDialog = ref(false)
const paymentDialog = ref(false)
const paymethod = ref(0)
const courier = ref(0)

</script>
