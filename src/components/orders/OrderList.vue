<template>
    <v-sheet min-height="600">
        <span class="text-subtitle-1" v-if="!isLoadingOrders && orders.length<=0">No Orders Found.</span>
        <Loader v-if="isLoadingOrders"/>
        <v-list lines="two" class="py-0 my-0 mx-5 overflow-y-auto" width="auto" max-height="600" v-else>
        <v-list-item class="pa-0 mb-3 elevation-1" variant="outlined" link v-for="order in orders" :key="order.id" @click="showOrder(order.id)" >
            <v-row class="">
                <v-col class="pa-3 pa-sm-5" cols="12" sm="9">
                    <v-container class="">
                        <v-row class="text-subtitle-1">
                            <v-col>
                                <div class="text-body-1">
                                    Order #{{ order.id }} | {{ orders.length }} items
                                </div>
                            </v-col>
                        </v-row>
                        <v-row class="my-0">
                                <v-col>
                                    <div class="text-subtitle-2">
                                        <v-icon :icon="getIcon(order.status_name)"></v-icon>
                                        {{ order.status_name }}
                                    </div>
                                </v-col>
                        </v-row>
                        <v-row class="my-0">
                            <v-col cols="12" class="py-0"><span class="text-subtitle-2">Courier: </span><span class="text-body-2">{{ getCourierName(order.order_courier) }}</span></v-col>
                        </v-row>
                        <v-row class="my-0">
                            <v-col cols="12" class="text-body-2 py-0"><span class="text-subtitle-2">Estimated Arrival: </span><span class="text-body-2">3-4 Days</span></v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="12" sm="3" class="d-flex justify-center align-center py-10 py-md-2 px-10">
                    <v-btn color="black" width="100%">Cancel</v-btn>
                </v-col>
            </v-row>
        </v-list-item>
    </v-list>
    </v-sheet>
</template>

<script setup>
import Loader from '../layout/Loader.vue';
import router from '@/router';

const props = defineProps({
   orders: [Array, Object],
   isLoadingOrders: Boolean
})

const getCourierName = (courier) => {
    if (courier!=null){
        const cour = JSON.parse(courier) 
        return cour.name   
    }
    else {
        return false
    }
}

const showOrder = (orderId) =>{
    router.push({name: 'OrderView', params:{orderId: orderId}})
}

const getIcon = (status) => {
    switch(status){
        case 'Packing':
            return 'mdi-package-variant'
            break
        case 'In Transit':
            return 'mdi-truck-fast-outline'
            break
        case 'Arrived':
            return 'mdi-check-decagram-outline'
            break
        case 'Cancelled':
            return 'mdi-cancel'
            break
        default:
            return 'mdi-package-variant'
            break
    }
}

// const getStatus = (status) => {
//     switch (status){
//         case 1:
//             return 'Packing'
//             break
//         case 2:
//             return 'In-Transit'
//             break
//         case 3:
//             return 'Arrived'
//             break
//         case 4:
//             return 'Cancelled'
//             break
//         default:
//             return 'Packing'
//             break       
//     }
// }

// onMounted(()=>{
//     console.log(props.orders[0])
// })
</script>
