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
                            <v-tab :value="1"><span class="text-uppercase">Packaging</span></v-tab>
                            <v-tab :value="2"><span class="text-uppercase">In Transit</span></v-tab>
                            <v-tab :value="3"><span class="text-uppercase">Arrived</span></v-tab>
                            <v-tab :value="4"><span class="text-uppercase">Cancelled</span></v-tab>
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
                        <v-window-item value="1">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :orders="orders"/>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                        <v-window-item value="2">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :orders="orders"/>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                        <v-window-item value="3">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :orders="orders"/>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>
                        <v-window-item value="4">
                            <v-container fluid>
                            <v-row>
                                <v-col>
                                    <OrderList :orders="orders"/>
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

import { ref, onMounted,computed } from 'vue';
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
const { orders, isLoadingOrders } = storeToRefs(useOrderStore())
const { handleUserOrders } = useOrderStore()

const props = defineProps({
    cartItemCount: Number,
    mobileView: Boolean
})

const tab = ref(1);
const orderCount = ref(5);
const orderFilter = ref('Newest to Oldest');
const orderFilterItems = ref(['Newest to Oldest', 'Oldest to Newest'])

const getTabValue = computed(()=>{
    switch (tab.value){
        case 1:
            return 'packing'
            break
        case 2:
            return 'in transit'
            break
        case 3:
            return 'arrived'
            break
        case 4:
            return 'cancelled'
            break
        default:
            return 'packing'
            break
            
    }
})

onMounted(()=>{
    handleUserOrders(getTabValue.value)
})
</script>
