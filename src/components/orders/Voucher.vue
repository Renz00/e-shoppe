<template>
     <v-dialog v-model="voucherDialog" max-width="500">
        <template v-slot:activator="{ props }">
            <v-card width="100%" :class="disableOrderSummaryButtons ? 'disabled-events' : ''" variant="outlined" v-bind="props" link>
                <v-container>
                    <v-row>
                        <v-col class="text-subtitle-2" cols="6" sm="8">
                            Selected Voucher
                            <div class="text-uppercase text-body-2 mt-2 blue-font" v-if="!disableOrderSummaryButtons">
                                See Vouchers
                            </div>
                        </v-col>
                        <v-col class="d-flex justify-center align-center text-center text-subtitle-2"
                            cols="6" sm="4">
                            {{ vouchers.name }}
                        </v-col>
                    </v-row>

                </v-container>
            </v-card>
        </template>
        <v-card>
            <v-card-title>
                Select or Enter Voucher
            </v-card-title>
            <form ref="voucherForm" @submit.prevent="saveVoucher()">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col class="my-0 py-0" cols="12" v-if="voucherType=='code'">
                                <div class="text-subtitle-2 pb-2">Enter Voucher Code</div>
                                <v-text-field v-model="selectedCode" density="compact" type="text" :rules="codeRules" variant="outlined" required></v-text-field>
                                <v-btn variant="text" color="primary" size="small" @click="selectedVoucher=null, voucherType='list'">Select A Voucher</v-btn>
                            </v-col>
                            <v-col class="my-0 py-0" cols="12" v-if="voucherType=='list'">
                                <div class="text-subtitle-2 pb-2">Select Voucher</div>
                                <v-select
                                v-model="selectedVoucher"
                                :items="voucherItems"
                                :rules="listRules"
                                variant="outlined"
                                density="compact"
                                required
                                >
                                </v-select>
                                <v-btn variant="text" color="primary" size="small" @click="selectedCode=null, voucherType='code'">Enter Voucher Code</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions v-if="!disableOrderSummaryButtons">
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="voucherDialog = false">
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

const { vouchers } = storeToRefs(useOrderStore())
const { setRunningTotal } = useOrderStore()

const props = defineProps({
    disableOrderSummaryButtons: Boolean
})

const voucherDialog = ref(false)
const voucherIsSaved = ref(false)
const selectedVoucher = ref(null)
const selectedCode = ref(null)
const voucherForm = ref()
const voucherType = ref('list')
const voucherItems = ref([])
const voucherObj = ref({
    'Free Shipping': {
        'shipping_discount': 100,
        'price_discount':0,
        'name': 'Free Shipping'
    },
    '10% OFF': {
        'shipping_discount': 0,
        'price_discount':10,
        'name': '10% OFF'
    },
    '25% OFF': {
        'shipping_discount': 0,
        'price_discount':25,
        'name': '25% OFF'
    }
})

const codeRules = ref([
    value =>  !!value || 'Voucher Code is required.',
    value =>  (value && getVoucher.value != false) || 'Voucher Code does not exist.',
    value => (value && value.length <= 100) || 'Voucher Code must be less than 100 characters.'
])
const listRules = ref([
    value =>  !!value || 'Please select a Voucher.'
])

// const getSelectedVoucher = (voucherKey) =>{
//     switch (voucherKey){
//         case voucherItems.value[0]:
//             voucherName.value = voucherItems.value[0]
//             break;
//         case voucherItems.value[1]:
//             voucherName.value = voucherItems.value[1]
//             break;
//         case voucherItems.value[2]:
//             voucherName.value = voucherItems.value[2]
//             break;
//         default:
//             voucherName.value = 'None'
//             break;
//     }
// }

const getVoucher = computed(()=>{
    let voucher = ''
    //Determine the voucher by checking the entered code
    switch (selectedCode.value){
            case 'V001':
                //Get voucher object based on the object key in voucherItems index
                voucher = voucherObj.value[`${voucherItems.value[0]}`]
                break;
            case 'V002':
                voucher = voucherObj.value[`${voucherItems.value[1]}`]
                break;
            case 'V003':
                voucher = voucherObj.value[`${voucherItems.value[2]}`]
                break;
            default:
                voucher = false
                break;
    }
    return voucher
})

const saveVoucher = () =>{
    let voucher = ''
    if (voucherType.value=='list' && selectedVoucher.value!=null){
        voucher = voucherObj.value[`${selectedVoucher.value}`]
        // getSelectedVoucher(selectedVoucher.value)
    }
    
    if (voucherType.value=='code' && selectedCode.value!=null) {
        voucher = getVoucher.value
        // getSelectedVoucher(voucher.name)
    }

    if (voucher != ''){
        vouchers.value = voucher
        voucherIsSaved.value = true
        voucherDialog.value = false
        setRunningTotal()
        console.log('Voucher is saved')
    }
    else {
        console.log('Voucher not saved')
    }
}

onMounted(() => {
    if (vouchers.value.name==''){
        vouchers.value.name = 'None'
    }
    voucherItems.value = Object.keys(voucherObj.value)
})

</script>