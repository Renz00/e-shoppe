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
                    Sub-total ({{ orderTotalItemQuantity }} Items)
                </v-col>
                <v-col>
                  ₱{{ orderSubTotal.toFixed(2).toLocaleString() }}
                </v-col>
            </v-row>
            <v-row class="my-0">
                <v-col>
                    Total Discount
                </v-col>
                <v-col>
                  <span v-if="vouchers.name!=''">₱{{ orderTotalDiscount.toFixed(2).toLocaleString() }}</span>
                  <span v-else>₱0.00</span>
                </v-col>
            </v-row>
            <v-row class="my-0">
                <v-col>
                  Shipping Fee
                </v-col>
                <v-col>
                  <span v-if="courier.name!=''">₱{{ orderShippingPrice.toFixed(2).toLocaleString() }}</span>
                  <span v-else>₱0.00</span>
                </v-col>
            </v-row>
            <v-divider class="my-2"></v-divider>
            <v-row class="py-2">
                <v-col>
                    Grand Total
                </v-col>
                <v-col>
                  ₱{{ Math.abs(orderGrandTotal).toFixed(2).toLocaleString() }}
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
import { onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
const { orderTotalItemQuantity, orderSubTotal, orderGrandTotal, 
  orderTotalDiscount, orderShippingPrice, vouchers, courier } = storeToRefs(useOrderStore())
const { setRunningTotal } = useOrderStore()

const props = defineProps({
  disableOrderSummaryButtons: Boolean,
  cardHeight: Number
})

onMounted(()=>{
  setRunningTotal()
})

</script>
