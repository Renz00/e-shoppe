<template>
    <v-container class="mt-5">
        <v-row>
            <v-col>
                <div class="text-h6">
                    My Orders
                </div>
                    <v-row :style="!mobileView ? 'height:70px;' : ''">
                        <v-col cols="12" sm="9">
                            <v-tabs
                                v-model="tab"
                                color="primary"
                                align-tabs="start"
                                center-active
                                show-arrows
                            >
                            <v-tab value="packing"><span class="text-uppercase">Packaging</span></v-tab>
                            <v-tab value="in-transit"><span class="text-uppercase">In Transit</span></v-tab>
                            <v-tab value="arrived"><span class="text-uppercase">Arrived</span></v-tab>
                            <v-tab value="cancelled"><span class="text-uppercase">Cancelled</span></v-tab>
                            </v-tabs>
                        </v-col>
                        <v-col class="d-flex justify-end align-center px-12 px-sm-2" cols="12" sm="3">
                            <v-select
                            v-model="orderFilter"
                            :items="orderFilterItems"
                            variant="outlined"
                            density="compact"
                          ></v-select>
                        </v-col>
                    </v-row>
                    <v-window v-model="tab">
                        <v-window-item value="packing">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :orders="orders" :isLoadingOrders="isLoadingOrders" />
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                        <v-window-item value="in-transit">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :orders="orders" :isLoadingOrders="isLoadingOrders" />
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                        <v-window-item value="arrived">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :orders="orders" :isLoadingOrders="isLoadingOrders" />
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                        <v-window-item value="cancelled">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :orders="orders" :isLoadingOrders="isLoadingOrders" />
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                     
                    </v-window>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <Pagination />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import OrderList from '@/components/orders/OrderList.vue'
import Pagination from '@/components/products/Pagination.vue';

import { ref, onMounted,computed, watch } from 'vue';
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
const { orders, isLoadingOrders } = storeToRefs(useOrderStore())
const { handleUserOrders } = useOrderStore()

const props = defineProps({
    cartItemCount: Number,
    mobileView: Boolean
})

const tab = ref('packing');
const orderCount = ref(5);
const orderFilter = ref('Newest to Oldest');
const orderFilterItems = ref(['Newest to Oldest', 'Oldest to Newest'])

watch(tab, async(newVal) => {
    isLoadingOrders.value = true
    await handleUserOrders(newVal)
})

onMounted(()=>{
    handleUserOrders(tab.value)
})
</script>
