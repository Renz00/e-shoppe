<template>
     <v-dialog v-model="addressDialog" max-width="500">
        <template v-slot:activator="{ props }">
            <v-card class="mx-0 elevation-2" v-bind="props" variant="outlined" :class="disableOrderSummaryButtons ? 'disabled-events' : ''" link>
            <template v-slot:prepend>
                <v-icon icon="mdi-map-marker-outline"></v-icon>
            </template>
            <template v-slot:title>
                <span class="text-subtitle-2">
                    Delivery Address
                </span>
                <div class="text-body-2 text-truncate">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </div>
                <div class="text-uppercase text-body-2 blue-font pt-2" v-if="!disableOrderSummaryButtons">
                    Change Address
                </div>
            </template>
        </v-card>
        </template>
        <v-card>
            <v-card-title>
                Set Shipping Address
            </v-card-title>
            <form ref="addressForm" @submit.prevent="saveAddress()">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col class="my-0 py-0" cols="12">
                                <div class="text-subtitle-2 pb-2">House No./Unit/Building</div>
                                <v-text-field v-model="address1" :rules="address1Rules" type="text" density="compact" variant="outlined" required></v-text-field>
                            </v-col>
                            <v-col class="my-0 py-0" cols="12">
                                <div class="text-subtitle-2 pb-2">City</div>
                                <v-autocomplete
                                    v-model="address2"
                                    :items="cities"
                                    density="compact"
                                    variant="outlined"
                                    type="text"
                                    :rules="address2Rules"
                                >
                                </v-autocomplete>
                            </v-col>
                            <v-col class="my-0 py-0" cols="12">
                                <div class="text-subtitle-2 pb-2">Zip Code</div>
                                <v-text-field v-model="zipCode" :rules="zipCodeRules" type="number" density="compact" variant="outlined" required></v-text-field>
                            </v-col>
                            <v-col class="my-0 py-0" cols="12">
                                <div class="text-subtitle-2 pb-2">Additional Notes</div>
                                <v-textarea v-model="additionalNotes" :rules="notesRules" type="text" variant="outlined" rows="2" auto-grow clearable></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="addressDialog = false">
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
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useOrderStore } from '@/store/order-store'
const { deliveryAddress } = storeToRefs(useOrderStore())

const props = defineProps({
    disableOrderSummaryButtons: Boolean
})

const addressForm = ref()
const address1Rules = ref([
    value =>  !!value || 'This field is required.',
    value => (value && value.length <= 150) || 'This field must be less than 150 characters.',
])
const address2Rules = ref([
    value =>  !!value || 'This field is required.',
    value => (value && value.length <= 150) || 'This field must be less than 150 characters.',
])
const zipCodeRules = ref([
    value =>  !!value || 'Zip Code is required.',
    value => (value && value.length <= 150) || 'Zip Code be less than 150 characters.',
    value => (value && Number.isFinite(+value)) || 'Zip Code must be a number.'
])
const notesRules = ref([
    value => (value && value.length <= 150) || 'Notes must be less than 150 characters.',
])

const address1 = ref('')
const address2 = ref('')
const cities = ref([
'Caloocan',
'Las Piñas',
'Makati',
'Malabon',
'Mandaluyong',
'City of Manila',
'Marikina',
'Muntinlupa',
'Navotas',
'Parañaque',
'Pasay',
'Pasig',
'Pateros',
'Quezon City',
'San Juan',
'Taguig',
'Valenzuela',
])
const zipCode = ref(null)
const additionalNotes = ref('')
const addressDialog = ref(false)
const saved = ref(false)

const saveAddress = () =>{
    const address = {
        'address1': address1.value,
        'address2': address2.value,
        'zipcode': zipCode.value,
        'notes': additionalNotes.value
    }
    deliveryAddress.value = address
    saved.value = true
    console.log('Address is saved')
}
</script>
