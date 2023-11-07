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
                            v-model="orderSortValue"
                            :items="orderFilterItems"
                            @update:modelValue="sortOrders(orderSortValue)"
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
                                    <OrderList :isLoadingOrders="isLoadingOrders" />
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                        <v-window-item value="in-transit">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :isLoadingOrders="isLoadingOrders" />
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                        <v-window-item value="arrived">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :isLoadingOrders="isLoadingOrders" />
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                        <v-window-item value="cancelled">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :isLoadingOrders="isLoadingOrders" />
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                    </v-window>
                <CancelOrderMsg />
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
import CancelOrderMsg from '@/components/orders/CancelOrderMsg.vue';

import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
const { orders, isLoadingOrders } = storeToRefs(useOrderStore())
const { handleUserOrders, handleSortOrders } = useOrderStore()

const props = defineProps({
    cartItemCount: Number,
    mobileView: Boolean
})

const tab = ref('packing');
const orderSortValue = ref('Newest to Oldest');
const orderFilterItems = ref(['Newest to Oldest', 'Oldest to Newest'])

watch(tab, async(newVal) => {
    await handleUserOrders(newVal)
})

const getSortCode = (sortName) =>{
    const sortItems = orderFilterItems.value

    switch (sortName){
        case sortItems[1]:
            return 'asc'
            break
        case sortItems[0]:
            return 'desc'
            break
        default:
            return 'asc'
            break
    }
}

const sortOrders = async (sort) =>{
    isLoadingOrders.value = true
    const sortCode = getSortCode(sort)
    const orderValue = orders.value[0]
    const sortObj = {
        "status": orderValue.status_name,
        "sort": sortCode
    }
    console.log(sortObj)
    await handleSortOrders(sortObj)
}

onMounted( async ()=>{
    await handleUserOrders(tab.value)
})
</script>
