<template>
  <v-container class="mt-5 mb-10" id="title">
    <v-sheet min-height="700">
    <v-row v-if="orderProducts.length>0">
      <v-col class="px-5 px-md-0" cols="12">
        <div class="text-h6 mb-3">
         
          <span v-if="orders.order_is_cancelled==true">Your Order #{{ orders.id }} is <span class="red-font">Cancelled</span></span>
          <span v-else>Your Order #{{ orders.id }} is being processed</span>
        </div>
        <v-card class="elevation-1" variant="outlined" height="auto" v-if="orders.order_is_cancelled!=true">
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
    <v-row v-if="isLoadingOrders">
      <v-col class="d-flex justify-center align-center text-center" cols="12">
        <Loader />
      </v-col>
    </v-row>
    <v-row class="mb-10" v-else>
      <v-col cols="12" lg="8">
        <v-row>
          <v-col>
            <OrderItemList :orderProducts="orderProducts" v-if="orderProducts.length>0"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col class="px-5 px-md-0" cols="12">
            <ShippingAddress :disableOrderSummaryButtons="true"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="px-5 px-md-0">
            <OrderSummary :disableOrderSummaryButtons="true"/>
          </v-col>
        </v-row>
        <v-row>
            <v-col class="px-5 px-md-0" cols="12" v-if="orders.order_is_cancelled!=true">
                <v-btn color="black" size="large" @click="cancel(orders.id)" :loading="isLoadingOrders" width="100%" aria-label="cancel order button">Cancel Order</v-btn>
            </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
  </v-container>
</template>

<script setup>
import OrderSummary from "@/components/orders/OrderSummary.vue"
import ShippingAddress from "@/components/orders/ShippingAddress.vue"
import OrderItemList from "@/components/orders/OrderItemList.vue"
import Loader from "@/components/layout/Loader.vue"

import {  onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
import { useProductStore } from '@/store/product-store'
const { orders, orderProducts, isLoadingOrders } = storeToRefs(useOrderStore())
const { handleFetchSelectedOrder, handleCancelOrder } = useOrderStore()
const { getCartItemCount } = useProductStore()

//Props from router and App.vue
const props = defineProps({
  cartItemCount: Number,
  orderId: String
})

const router = useRouter();

const previousPage = computed(() => {
    const lastPath = router.options.history.state.back;
    return lastPath ? lastPath : '/';
});

const cancel = async(orderId) =>{
  const title = document.getElementById('title');
  title.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start"
  });
  await handleCancelOrder(orderId)
  await handleFetchSelectedOrder(props.orderId)
  
}

onMounted(async ()=>{
  if (sessionStorage.getItem('cart')!=null){
    if (previousPage.value == '/cart'){
      //delete cart session only if cart is checked out
      sessionStorage.removeItem('cart')
    }
    getCartItemCount()
  }
  await handleFetchSelectedOrder(props.orderId)
})

</script>
