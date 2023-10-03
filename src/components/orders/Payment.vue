<template>
    <v-dialog v-model="paymentDialog" persistent max-width="500">
        <template v-slot:activator="{ props }">
            <v-card :class="disableOrderSummaryButtons ? 'disabled-events' : ''" width="100%" variant="outlined" v-bind="props" link>
                <v-container>
                    <v-row>
                        <v-col class="text-subtitle-2" cols="6" sm="8">
                            Payment Method
                            <div class="text-uppercase text-body-2 mt-2 blue-font" v-if="!disableOrderSummaryButtons">
                                Change Payment
                            </div>
                        </v-col>
                        <v-col class="d-flex justify-center align-center text-center text-subtitle-2"
                        cols="6" sm="4">{{ paymentName }}</v-col>
                    </v-row>
                </v-container>
            </v-card>
        </template>
        <v-card>
            <v-card-title>
                Select Payment Method
            </v-card-title>
            <form ref="paymentForm" @submit.prevent="savePayment()">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-radio-group v-model="selectedPaymethod" column>
                                <v-radio :label="item.name" :value="index" v-for="(item, index) in paymentItems" :key="item.id"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions v-if="!disableOrderSummaryButtons">
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="paymentDialog = false">
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
import { ref, onMounted } from 'vue'
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
const { payment } = storeToRefs(useOrderStore())
const { setRunningTotal } = useOrderStore()

const props = defineProps({
    disableOrderSummaryButtons: Boolean
})

const paymentName = ref(null)
const paymentForm = ref()
const paymentIsSaved = ref(false)
const paymentDialog = ref(false)
const selectedPaymethod = ref(0)
const paymentItems = ref([
    {
        name: 'Cash On Delivery',
        id: 1
    },
    {
        name: 'Paypal',
        id: 2
    },
    {
        name: 'Mastercard',
        id: 3
    }
])

const setPaymentName = (paymentItem) =>{
   paymentName.value = paymentItem.name
   //Setting a value for the payment store object
   payment.value = selectedPaymethod.value
}

const savePayment = () =>{
    setPaymentName(paymentItems.value[selectedPaymethod.value])
    paymentIsSaved.value = true
    paymentDialog.value = false
    setRunningTotal()
    console.log('Payment is saved')
}

onMounted(()=>{
    setPaymentName(paymentItems.value[0])
})
</script>