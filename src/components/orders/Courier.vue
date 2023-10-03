<template>       
<v-dialog v-model="shippingDialog" persistent max-width="500">
    <template v-slot:activator="{ props }">
        <v-card width="100%" :class="disableOrderSummaryButtons ? 'disabled-events' : ''" variant="outlined" v-bind="props" link>
            <v-container>
                <v-row>
                    <v-col class="text-subtitle-2" cols="6" sm="8">
                        Courier
                        <div class="text-uppercase text-body-2 mt-2 blue-font" v-if="!disableOrderSummaryButtons">
                            Change Shipping
                        </div>
                    </v-col>
                    <v-col class="d-flex justify-center align-center text-center text-subtitle-2"
                    cols="6" sm="4">{{ courierName }}</v-col>
                </v-row>

            </v-container>
        </v-card>
    </template>
    <v-card>
        <v-card-title>
            Courier Details
        </v-card-title>
        <form ref="courierForm" @submit.prevent="saveCourier()">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-radio-group v-model="selectedCourier" column>
                                <v-radio :label="item.name" :value="index" v-for="(item, index) in courierItems" :key="item.id"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions v-if="!disableOrderSummaryButtons">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="shippingDialog = false">
                    Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" type="submit">
                    Save
                </v-btn>
            </v-card-actions>
        </form>
    </v-card>
</v-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
const { courier } = storeToRefs(useOrderStore())
const { setRunningTotal } = useOrderStore()

const props = defineProps({
    disableOrderSummaryButtons: Boolean
})

const courierForm = ref()
const courierName = ref(null)
const shippingDialog = ref(false)
const selectedCourier = ref(0)
const courierIsSaved = ref(false)
const courierItems = ref([
    {
        name: 'J&T',
        price: 50,
        id: 1
    },
    {
        name: 'LBC',
        price: 65,
        id: 2
    }
])

const setCourierName = (courierItem)=>{
    courierName.value = courierItem.name+' - ₱'+courierItem.price
    //Setting value of courier store (object)
    courier.value = courierItems.value[selectedCourier.value]
} 

const saveCourier = () =>{
    setCourierName(courierItems.value[selectedCourier.value])
    courierIsSaved.value = true
    shippingDialog.value = false
    setRunningTotal()
    console.log('Courier is saved')
}

onMounted(()=>{
    setCourierName(courierItems.value[0])
})
</script>