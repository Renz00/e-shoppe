<template>       
<v-dialog v-model="shippingDialog" persistent max-width="500">
    <template v-slot:activator="{ props }">
        <v-card width="100%" :class="disableOrderSummaryButtons ? 'disabled-events' : ''" variant="outlined" v-bind="props" link>
            <v-container>
                <v-row>
                    <v-col class="text-subtitle-2" cols="6" sm="8">
                        J&T Express
                        <div class="text-uppercase text-body-2 mt-2 blue-font" v-if="!disableOrderSummaryButtons">
                            Change Shipping
                        </div>
                    </v-col>
                    <v-col class="d-flex justify-center align-center text-subtitle-2"
                    cols="6" sm="4">₱50</v-col>
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
                                <v-radio label="J&T - ₱50" :value="1"></v-radio>
                                <v-radio label="LBC - ₱65" :value="2"></v-radio>
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
import { ref } from 'vue'
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
const { courier } = storeToRefs(useOrderStore())

const props = defineProps({
    disableOrderSummaryButtons: Boolean
})

const shippingDialog = ref(false)
const selectedCourier = ref(1)
const courierIsSaved = ref(false)
const courierForm = ref()

const saveCourier = () =>{
    courier.value = selectedCourier.value
    courierIsSaved.value = true
    shippingDialog.value = false
    console.log('Courier is saved')
}
</script>